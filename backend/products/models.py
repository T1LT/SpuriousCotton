from django.db import models
from django.utils import timezone
from users.models import User
# Create your models here.

class ProductDetails(models.Model):
    manufactured_date = models.DateField(null=False)
    expiry_date = models.DateField(null=False)
    variety = models.CharField(max_length=32)
    quantity = models.IntegerField(null=False)
    price = models.DecimalField(max_digits=12, decimal_places=3)
    manufacturer = models.ForeignKey(User, on_delete=models.CASCADE)

class ScannedProducts(models.Model):
    _choices = (
        (0, "Not Fake"),
        (1, "Fake"),
        (2, "Fraud"),
    )
    
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.OneToOneField(ProductDetails, on_delete=models.CASCADE)
    status = models.PositiveSmallIntegerField(choices=_choices)
    scanned_date = models.DateField(default=timezone.now)

