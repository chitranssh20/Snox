from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Products
from Serializers.ProductSerializer import ProductSerializer
# Create your views here.

class AddProduct(APIView):
    def post(self, request):
        data = request.data
        if 'name' not in data or 'subname' not in data or 'image' not in data or 'price' not in data or 'brief' not in data or 'description' not in data:
            return Response({"response": "Missing Fields"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            name = data['name']
            subname = data['subname']
            price = data['price']
            image = data['image']
            brief = data['brief']
            description = data['description']

            product = Products(name = name, subname = subname, price = price, image = image, brief = brief, description= description)
            product.save()
            return Response({"response": "Product has been saved successfully"}, status=status.HTTP_201_CREATED)
        
        except:
            return Response({"response": "Something is broken"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetProduct(APIView):
    def get(self, request):
        try:
            all_products = Products.objects.all()
            serializer = ProductSerializer(all_products, many=True)
            return Response({"products": serializer.data }, status=status.HTTP_200_OK)

        except RuntimeError:
            print(RuntimeError)
            return Response({"response": "Something is broke"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)