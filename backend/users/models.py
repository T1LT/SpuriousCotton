from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_superuser(self, email, password, **other_fields):
        other_fields.setdefault('user_type', 3)
        user = self.create_user(email=email, password=password, **other_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

    def create_user(self, email, password, **other_fields):
        if not email:
            raise ValueError(_("You must provide an email address."))
        else:
            pass
        user = self.model(email = self.normalize_email(email), **other_fields)
        user.set_password(password)
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    USER_TYPE_CHOICES = (
            (1, 'Manufacturer'),
            (2, 'Customer'),
            (3, 'admin')
        )

    email = models.EmailField(max_length=32, unique=True)
    password = models.CharField(max_length=255)
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES)
    user_name = models.CharField(max_length=32, unique=True, blank=False, null=True)
    first_name = models.CharField(max_length=32, null=True)
    last_name = models.CharField(max_length=32, null=True)
    phone_number = PhoneNumberField()
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self) -> str:
        return self.email
