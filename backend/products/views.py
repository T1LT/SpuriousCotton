from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ProductDetailsSerializer
from .models import ProductDetails, ScannedProducts
from users.models import User



# manufacturer functionalities
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def registered_product_details(request):
    user = request.user
    if user.is_authenticated:
        if (user.user_type == 1):
            if request.method == "GET":
                registered_product_details = ProductDetails.objects.filter(manufacturer_id = user.id)
                serializer = ProductDetailsSerializer(registered_product_details, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            elif request.method == "POST":
                data = {
                    "manufactured_date": request.data.get('MFD', None),
                    "expiry_date": request.data.get('EXP', None),
                    "variety": request.data.get('variety', None),
                    "quantity": request.data.get('quantity', None),
                    "price": request.data.get('price', None),
                    "manufacturer_id": user.id
                }
                product_details = ProductDetails(**data)
                product_details.save()
                return Response(data={"id": product_details.id}, status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)


# customer functionalities
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def scanned_product_details(request):
    user = request.user
    print(user.id)
    if user.is_authenticated:
        if (user.user_type == 2):
            if request.method == "GET":
                all_scanned_products = []
                scanned_product_details = ScannedProducts.objects.filter(customer_id=user.id)
                for scanned_product in scanned_product_details:
                    product_details = ProductDetails.objects.get(id=scanned_product.product_id)
                    serializer = ProductDetailsSerializer(product_details)
                    all_scanned_products.append({"manufacturer_name": User.objects.get(id=serializer.data["manufacturer"]).user_name, **serializer.data})
                return Response({"previouslyScannedProducts": all_scanned_products}, status=status.HTTP_200_OK)
            elif request.method == "POST":
                try:
                    product_details = ProductDetails.objects.get(id=request.data["id"])
                    try:
                        scanned_product_details = ScannedProducts.objects.get(product = request.data["id"])
                        print("scanned product details are found", scanned_product_details.scanned_date)
                        return Response({"status":2, "message": "This product was already scanned.", "scanned_date": scanned_product_details.scanned_date}, status=status.HTTP_200_OK)
                    except:
                        scanned_product_details = ScannedProducts(status=1, customer=user, product=ProductDetails.objects.get(id=request.data["id"]))
                        scanned_product_details.save()
                        serializer = ProductDetailsSerializer(product_details)
                        return Response({"status": 1, **serializer.data, "manufacturer_name": User.objects.get(id=serializer.data["manufacturer"]).user_name}, status=status.HTTP_200_OK)
                except:
                    scanned_product_details = ScannedProducts(status=0, customer=user, product=ProductDetails.objects.get(id=request.data["id"]))
                    scanned_product_details.save()
                    return Response({"status":0}, status=status.HTTP_200_OK)
                return Response(status=200)
            else:
                pass
            return Response(status=200)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

