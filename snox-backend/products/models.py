from django.db import models

# Create your models here.
class Products(models.Model):
    productId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    subname = models.CharField(max_length=100)
    image = models.ImageField(upload_to='Media')
    price = models.IntegerField()
    brief = models.CharField(max_length=2000)
    description = models.TextField()

    


