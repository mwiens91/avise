"""Contains serializers for models."""

from rest_framework import serializers
from .models import (
    DataPointAlcohol,
    DataPointNicotine,
    User,
)


class UserReadOnlySerializer(serializers.ModelSerializer):
    """A serializer for a user."""

    class Meta:
        model = User
        fields = ("username", "date_joined", "last_login", "is_staff")


class DataPointAlcoholSerializer(serializers.ModelSerializer):
    """A serializer for a alcohol data points."""

    class Meta:
        model = DataPointAlcohol
        fields = ("id", "datetime", "user", "quantity")


class DataPointNicotineSerializer(serializers.ModelSerializer):
    """A serializer for a nicotine data points."""

    class Meta:
        model = DataPointNicotine
        fields = ("id", "datetime", "user", "quantity")
