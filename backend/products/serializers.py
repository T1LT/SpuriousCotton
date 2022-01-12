from rest_framework import serializers
from .models import ProductDetails, ScannedProducts

class ProductDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductDetails
        fields = "__all__"

class ScannedProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScannedProducts
        fields = "__all__"