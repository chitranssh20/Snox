from rest_framework.authentication import BaseAuthentication
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed, APIException
import jwt
from users.models import User

def verifyJWT(token):
    try:
        details = jwt.decode(token, "secret", algorithms="HS256")
        email = details['email']
        try:
            user = User.objects.get(email = email)
            return ( user , email)
        except:
            raise CustomAuthenticationError(detail="Invalid Token", code=status.HTTP_400_BAD_REQUEST)
    except:
        raise CustomAuthenticationError(detail="Invalid Token is it last ", code=status.HTTP_400_BAD_REQUEST)


# class TokenAuthentication(BaseAuthentication):
#     def authenticate(self, request):
#         headers = request.META 
#         try:
#             jwt_token = headers.get('HTTP_AUTHORIZATION')
#             print("jwt_token", jwt_token)
#             try:
#                 jwt.decode(jwt_token, "secret", algorithms='HS256')
#             except jwt.ExpiredSignatureError:
#                 print("Token has expired")
#                 raise CustomAuthenticationError(detail="Token is expired", code=status.HTTP_403_FORBIDDEN)
#             except jwt.InvalidTokenError as e:
#                 print(e)
#                 print("Invalid token")
#                 raise CustomAuthenticationError(detail="Invalid Token", code=status.HTTP_403_FORBIDDEN)
#             if jwt_token:
#                 return verifyJWT(jwt_token)
#             else:
#                 raise CustomAuthenticationError(detail="Invalid Token ", code=status.HTTP_403_FORBIDDEN)
#         except CustomAuthenticationError as e:
#             raise e
#         except Exception:
#             raise CustomAuthenticationError(detail="Auth Header not provided", code=status.HTTP_400_BAD_REQUEST)


class TokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        headers = request.META 
        try:
            jwt_token = headers['HTTP_AUTHORIZATION']
            try:
                if jwt_token:
                    return verifyJWT(jwt_token)
                else:
                    raise CustomAuthenticationError(detail="waht the heckck", code=status.HTTP_101_SWITCHING_PROTOCOLS)
            except:
                raise CustomAuthenticationError(detail="Invalid Token", code=status.HTTP_400_BAD_REQUEST)
            
        except:
            raise CustomAuthenticationError(detail="Auth Header not provided", code=status.HTTP_400_BAD_REQUEST)
            
class CustomAuthenticationError(APIException):
    def __init__(self, detail=None, code=None):
        self.status_code = code
        super().__init__(detail, code)
    
