from rest_framework.authentication import BaseAuthentication
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed, APIException
import jsonwebtoken as jwt
import datetime

def verifyJWT(token):
    details = jwt.decode(token, "secret", algorithms="HS256")
    # TODO: Set Expiry of Token after 3 days
    return None

class TokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        print("called")
        headers = request.META 
        try:
            jwt_token = headers['HTTP_AUTHORIZATION']
            
            email, iat = jwt.decode(request.token, "secret")
            verifyJWT(jwt_token)
        except:
            raise CustomAuthenticationError(detail="Auth Header not provided", code=status.HTTP_400_BAD_REQUEST)
            
        return (None, None)
class CustomAuthenticationError(APIException):
    def __init__(self, detail=None, code=None):
        self.status_code = code
        super().__init__(detail, code)
    
