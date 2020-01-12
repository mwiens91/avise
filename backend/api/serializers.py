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
        fields = ("id", "datetime", "user", "quantity")


class DataPointNicotineSerializer(serializers.ModelSerializer):
    """A serializer for a nicotine data points."""

    class Meta:
        model = DataPointNicotine
        fields = ("id", "datetime", "user", "quantity")


class UserReadOnlySerializer(serializers.ModelSerializer):
    """A serializer for a user."""

    alcohol_data_points = DataPointAlcoholSerializer(many=True)
    nicotine_data_points = DataPointNicotineSerializer(many=True)

    class Meta:
        model = User
        fields = (
            "username",
            "alcohol_data_points",
            "nicotine_data_points",
            "date_joined",
            "last_login",
            "is_staff",
        )
