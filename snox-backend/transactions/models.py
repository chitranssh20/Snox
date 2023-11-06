from django.db import models
from users.models import User, Address
# Create your models here.

class Transactions(models.Model):
    transactionId = models.AutoField(primary_key=True)
    cart = models.JSONField(null=False, blank=False)
    customer = models.ForeignKey('users.User', on_delete=models.CASCADE)
    street = models.CharField(null=False, blank=False, max_length=200)
    city = models.ForeignKey("users.Address", on_delete=models.DO_NOTHING)

