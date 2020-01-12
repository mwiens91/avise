"""Contains viewsets for the API."""

from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.openapi import Schema, TYPE_OBJECT, TYPE_STRING
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, BasePermission
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import (
    DataPointAlcohol,
    DataPointNicotine,
    User,
    Vape
)
from .serializers import (
    DataPointAlcoholSerializer,
    DataPointNicotineSerializer,
    UserReadOnlySerializer,
    UserWriteSerializer,
    VapeSerializer
)


class AllowAnyForPostAndGetPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in ["post", "get"]:
            return True

        return request.user and request.user.is_authenticated


@swagger_auto_schema(
    method="get", responses={status.HTTP_200_OK: UserReadOnlySerializer}
)
@api_view(["GET"])
def current_user(request, token):
    """Determine the current user by their token, and return their data."""
    try:
        user = Token.objects.get(key=token).user
    except ObjectDoesNotExist:
        return Response(
            {"Bad request": "Token does not correspond to an existing user"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    return Response(UserReadOnlySerializer(user).data)


class ObtainAuthTokenView(APIView):
    """Return auth token for passed in user."""

    permission_classes = (AllowAny,)
    serializer_class = AuthTokenSerializer
    queryset = Token.objects.all()

    @swagger_auto_schema(
        request_body=AuthTokenSerializer,
        responses={
            status.HTTP_200_OK: Schema(
                type=TYPE_OBJECT,
                properties={"token": Schema(type=TYPE_STRING)},
            )
        },
    )
    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token = Token.objects.get(user=user)
        return Response({"token": token.key})


class UserViewSet(viewsets.ModelViewSet):
    """A viewset for users."""

    queryset = User.objects.all()
    lookup_field = "username"
    http_method_names = ["get", "post", "patch"]
    permission_classes = (AllowAnyForPostAndGetPermission,)

    def get_serializer_class(self, *args, **kwargs):
        if self.request.method in ("POST", "PATCH"):
            return UserWriteSerializer["get", "post", "patch"]


        return UserReadOnlySerializer

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)

        return user


class DataPointAlcoholViewSet(viewsets.ModelViewSet):
    """A viewset for alcohol data points."""

    queryset = DataPointAlcohol.objects.all()
    http_method_names = ["get", "post", "patch", "delete"]
    serializer_class = DataPointAlcoholSerializer


class DataPointNicotineViewSet(viewsets.ModelViewSet):
    """A viewset for nicotine data points."""

    queryset = DataPointNicotine.objects.all()
    http_method_names = ["get", "post", "patch", "delete"]
    serializer_class = DataPointNicotineSerializer


class VapeViewSet(viewsets.ModelViewSet):
    """A viewset for vapes."""

    queryset = Vape.objects.all()
    http_method_names = ["get", "post", "patch", "delete"]
    serializer_class = VapeSerializer
