from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *

urlpatterns = [
    path('auth/token/', MyTokenObtainPairView.as_view(), name = 'token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name = 'token_refresh'),
    path('signup/', signup),
    path('profile/', getProfile),
    path('manufacturers/', getAllManufacturers),
]
