from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomUserSerializer, ProfileSerializer
from .models import User

USER_TYPE = {
    1: "Manufacturer",
    2: "Customer",
}

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['userType'] = USER_TYPE[user.user_type]
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["POST"])
def signup(request):
    print(request.data)
    user_type = request.data.get("registerAs", None)
    if user_type == "Manufacturer":
        user_type = 1
    elif user_type == "Customer":
        user_type = 2
    else:
        pass
    data = {
        "email": request.data.get("email", None).lower(),
        "password": request.data.get("password", None),
        "user_type": user_type,
        "user_name": request.data.get("name", None),
        "first_name": request.data.get("firstName", None),
        "last_name": request.data.get("lastName", None),
        "phone_number": "+91"+request.data.get("phone", None),
    }
    serializer = CustomUserSerializer(data=data)
    if serializer.is_valid():
        user = serializer.save()
        if user is not None:
            json = serializer.data
            return Response(json, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=200)


@api_view(["GET"])
def getProfile(request):
    user = request.user
    print(type(user))
    serializer = ProfileSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def getAllManufacturers(request):
    manufacturers = User.objects.filter(user_type=1)
    serializer = ProfileSerializer(manufacturers, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)