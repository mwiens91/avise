"""Contains serializers for models."""

from rest_framework import serializers
from .models import (
    DataPointAlcohol,
    DataPointNicotine,
    User,
)


class DataPointAlcoholSerializer(serializers.ModelSerializer):
    """A serializer for a alcohol data points."""

    class Meta:
        model = DataPointAlcohol
        fields = ("id", "datetime", "user", "quantity", "category")


class DataPointNicotineSerializer(serializers.ModelSerializer):
    """A serializer for a nicotine data points."""

    class Meta:
        model = DataPointNicotine
        fields = ("id", "datetime", "user", "quantity", "category")


class UserReadOnlySerializer(serializers.ModelSerializer):
    """A read-only serializer for a user."""

    alcohol_data_points = DataPointAlcoholSerializer(many=True)
    nicotine_data_points = DataPointNicotineSerializer(many=True)

    class Meta:
        model = User
        fields = (
            "username",
            "track_nicotine",
            "track_alcohol",
            "alcohol_data_points",
            "nicotine_data_points",
            "date_joined",
            "last_login",
            "is_staff",
        )


class UserWriteSerializer(serializers.ModelSerializer):
    """A write serializer for a user."""

    class Meta:
        model = User
        fields = (
            "email",
            "username",
            "password",
            "track_nicotine",
            "track_alcohol",
        )
