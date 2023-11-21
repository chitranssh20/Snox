from django.shortcuts import render
from rest_framework.views import APIView 
from AuthClasses.authenticate import TokenAuthentication
from rest_framework.response import Response
from rest_framework import status
from .models import Transactions
from products.models import Products
from users.models import User, Address
import json
from Serializers.AddressSerializer import AddressSerializer
from Serializers.ProductSerializer import ProductSerializer
from Serializers.UserSerializer import CompleteUserSerializer
# Create your views here.
class Transact(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self, request):

        email = request.auth
        data = request.data['cart'] 

        newCart = []
        total = 0;
        for item in data:
            prodId = int(item['id'])

            if Products.objects.filter(pk = prodId).exists():

                product = Products.objects.get(pk = prodId)
                serializerProduct = ProductSerializer(product)
                prodData = serializerProduct.data          
                confirmedItem = {"name": prodData['name'], "price": prodData['price'] * int(item['qty'])}
                total += confirmedItem['price']
                newCart.append(confirmedItem)
            else:
                continue
        
        if len(newCart) > 0:
            user = User.objects.get(email = request.auth)
            userData = CompleteUserSerializer(user)
            cityId = userData.data['city']
            city = Address.objects.get(cityId = cityId)
            cityname = AddressSerializer(city)
            userDataCopy = userData.data 
            userDataCopy['city'] = cityname.data['city']

            return Response({"response": "Cart has been verified", "cart": newCart, "total": total, "user": userDataCopy}, status=status.HTTP_202_ACCEPTED)
        return Response({"response": "Checking"}, status=status.HTTP_200_OK)
    