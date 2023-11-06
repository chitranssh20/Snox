from django.shortcuts import render
from rest_framework.views import APIView 
from AuthClasses.authenticate import TokenAuthentication
from .models import Transactions

# Create your views here.
class Transact(APIView):
    authentication_classes = [TokenAuthentication]
    