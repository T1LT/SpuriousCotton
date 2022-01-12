from django.urls import path
from .views import *

urlpatterns = [
    path("register-product-details/", registered_product_details),
    path("scanned-product-details/", scanned_product_details),
]