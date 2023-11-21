from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .models import Address
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login, logout
from Serializers.UserSerializer import UserSerializer
import jwt
import datetime
from AuthClasses.authenticate import TokenAuthentication
import pytz
import time
# Create your views here.
def createJWT(email):
    encoded = jwt.encode({"some": "payload"}, "secret", algorithm="HS256")
    tokenWeHave = jwt.encode({"email": email, "iat": time.time() }, key="secret", algorithm="HS256")
    decoded = jwt.decode(encoded, "secret", algorithms=["HS256"])
    try:
        toded = jwt.decode(tokenWeHave, "secret", algorithms=["HS256"])
    except jwt.InvalidTokenError as e:
        print(e)
    return tokenWeHave

class RegisterUser(APIView):
    def post(self, request):
        data = request.data 
        try:
            if 'fname' not in data or 'lname' not in data or 'phone' not in data or 'email' not in data or 'city' not in data or 'password' not in data or  'street' not in data:
                return Response({"response": "Missing Fields"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"response": "Something is broke"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        fname = request.data['fname']
        lname = request.data['lname']
        email = request.data['email']
        phone = request.data['phone']
        street= request.data['street']
        city = request.data['city']
        password = request.data['password']

        try:
            IsUserRegistered = User.objects.get(email = email)
            return Response({"response":"User already registered"}, status=status.HTTP_409_CONFLICT)
        except:
            try :
              
                user = User.objects.create_user(fname=fname, lname=lname, email=email, password=password, street=street, city=city, phone=phone)
                token = createJWT(email)
                userDetail = User.objects.get(email = email)
                details = UserSerializer(userDetail)

                return Response({"response": "User has been registered","info": details.data, "token": token}, status=status.HTTP_201_CREATED)
                
            except TypeError:
                return Response({"response": "Server is broken"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
          
         
class LogInUser(APIView):
    def post(self, request):
        data = request.data 
        email = data['email']
        password = data['password']
        if 'email' not in data or 'password' not in data:
            return Response({"response": "Missing credentials"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            emailExists =  User.objects.get(email = email)
            try:
                user = authenticate(request,username= email,password= password)
                print(user)
                user = 15
                if user is not None:
                    try:
                        token = createJWT(email)
                        # return Response({5})
                        userName = User.objects.get(email = email)
                        userDetail = UserSerializer(userName)
                        return Response({"response": "User succesffuly logged in","info": userDetail.data, "token": token}, status=status.HTTP_202_ACCEPTED)
                    except:
                        return Response({"Resposne": "COuld not logged in"}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
                else:
                    return Response({"response":"Wrong password"}, status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response({"response": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST)

        except:
            return Response({"response": "User is not registered"}, status=status.HTTP_404_NOT_FOUND)

class Check(APIView):
    authentication_classes = [TokenAuthentication]
    def post(self, request):

        return Response({5})
