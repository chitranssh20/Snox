from django.db import models
from django.contrib.auth.models import AbstractUser, AbstractBaseUser, BaseUserManager
from django.contrib.auth.hashers import make_password
# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, fname, lname, phone, city ,street, email , password= None):
        if not email:
            raise ValueError("Email is not provided")
        if not password:
            raise ValueError("Password is not provided")
        if not fname or not lname or not  phone or not city or not street:
            raise ValueError("Missing Credentials")
        email = self.normalize_email(email)
        try:
            IsCityInAddress = Address.objects.get(city = city)
        except:
            addCity = Address(city = city)
            addCity.save()
        cityId = Address.objects.get(city = city)
        password = make_password(password)
        user = self.model(email = email, password = password, fname= fname, lname = lname, phone = phone , city = cityId, street = street)
        user.save()
        print("user manager",  user)
        return user 
    
    def create_superuser(self, fname, lname, phone, city, street, email, password = None):
        return self.create_user(fname, lname, phone, city, street, email, password)


class User(AbstractBaseUser):
    userId = models.AutoField(primary_key=True)
    fname = models.CharField(max_length=50, null=False, blank=False)
    lname = models.CharField(max_length=50, null=False, blank=False)
    email = models.EmailField(max_length=200, unique=True, null=False)
    password = models.CharField()
    phone = models.CharField(max_length=10, null=False, blank=False)
    street = models.CharField(max_length=200, null = True)
    city = models.ForeignKey('Address', on_delete=models.CASCADE)

    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS= ['fname', 'lname', 'phone', 'city']

    objects = UserManager()
    custobj = UserManager()

    def __str__(self) -> str:
        return self.fname + " "+ self.lname
    

class Address(models.Model):
    cityId = models.AutoField(primary_key=True)
    city = models.CharField(max_length=20)
    

