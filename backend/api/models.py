# TODO: probably want these later
#from django.conf import settings
#from django.db import models

from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class User(AbstractUser):
    """Custom user model."""

    class Meta:
        """Model metadata."""

        # Order by username in ascending order
        ordering = ["username"]


@receiver(post_save, sender=User)
def create_auth_token(instance, created, **_):
    """Create an auth token for each new user."""
    if created:
        Token.objects.create(user=instance)
