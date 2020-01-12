from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class User(AbstractUser):
    """Custom user model."""

    track_nicotine = models.BooleanField(
        default=True, help_text="Whether to track nicotine consumption."
    )
    track_alcohol = models.BooleanField(
        default=True, help_text="Whether to track alcohol consumption."
    )

    class Meta:
        """Model metadata."""

        # Order by username in ascending order
        ordering = ["username"]


class AbstractDataPoint(models.Model):
    """Sets up basic structure for data points.

    This is an abstract model, so it doesn't create a table in the database.
    """

    datetime = models.DateTimeField(auto_now_add=True)
    quantity = models.FloatField()

    class Meta:
        abstract = True


class DataPointNicotine(AbstractDataPoint):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="nicotine_data_points"
    )
    category = models.CharField(
        max_length=25,
        choices=[
            ("cigarette", "cigarette"),
            ("gum", "gum"),
            ("patch", "patch"),
            ("vape", "vape"),
        ],
    )


class DataPointAlcohol(AbstractDataPoint):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="alcohol_data_points"
    )
    category = models.CharField(
        max_length=25,
        choices=[("beer", "beer"), ("spirits", "spirits"), ("wine", "wine"),],
    )


@receiver(post_save, sender=User)
def create_auth_token(instance, created, **_):
    """Create an auth token for each new user."""
    if created:
        Token.objects.create(user=instance)
