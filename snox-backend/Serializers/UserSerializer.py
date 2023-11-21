from rest_framework.serializers import ModelSerializer
from users.models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['fname',  'lname']

class CompleteUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['fname', 'lname', 'city', 'email', 'phone', 'street']
