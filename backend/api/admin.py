from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import DataPointNicotine, DataPointAlcohol, User


@admin.register(DataPointAlcohol, DataPointNicotine)
class DataPointAdmin(admin.ModelAdmin):
    """Settings for DataPoint models on admin page."""

    list_display = ("id", "user", "datetime", "quantity")


# Register custom user model
admin.site.register(User, UserAdmin)
