"""Contains serializers for models."""

from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import (
    DataPointAlcohol,
    DataPointNicotine,
    User,
    Vape,
)


class VapeSerializer(serializers.ModelSerializer):
    """A serializer for vapes."""

    class Meta:
        model = Vape
        fields = ("id", "user", "volume", "strength")


class DataPointAlcoholSerializer(serializers.ModelSerializer):
    """A serializer for alcohol data points."""

    class Meta:
        model = DataPointAlcohol
        fields = ("id", "datetime", "user", "quantity", "category")


class DataPointNicotineSerializer(serializers.ModelSerializer):
    """A serializer for nicotine data points."""

    class Meta:
        model = DataPointNicotine
        fields = ("id", "datetime", "user", "quantity", "category")


class UserReadOnlySerializer(serializers.ModelSerializer):
    """A read-only serializer for users."""

    vape = VapeSerializer()
    alcohol_data_points = DataPointAlcoholSerializer(many=True)
    nicotine_data_points = DataPointNicotineSerializer(many=True)

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "track_nicotine",
            "track_alcohol",
            "discord_id",
            "vape",
            "alcohol_data_points",
            "nicotine_data_points",
            "date_joined",
            "last_login",
            "is_staff",
        )


class UserWriteSerializer(serializers.ModelSerializer):
    """A write serializer for users."""


    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user



    class Meta:
        model = User
        fields = (
            "email",
            "username",
            "password",
            "discord_id",
            "track_nicotine",
            "track_alcohol",
        )
