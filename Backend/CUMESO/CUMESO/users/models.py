from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings
from datetime import datetime, timedelta
import jwt

class UserManager(BaseUserManager):
    def create_user(self, email,username,company, password):
        user = self.model(email=self.normalize_email(email), username=username,company=company, type='client')
        print(user)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password):
        user = self.model(email=self.normalize_email(email), username=username, type='admin')
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save()
        return user

class Users(AbstractBaseUser, PermissionsMixin):
    uuid = models.CharField('uuid', max_length=36, unique=True, editable=False, null=False)
    username = models.CharField('username', max_length=30, unique=True, null=False)
    email = models.EmailField('email', unique=True)
    company = models.CharField('company', max_length=100, null=True)
    image = models.ImageField(upload_to='img_profile/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    type = models.CharField('type', max_length=10, null=False, default='client')

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = UserManager()

    @property
    def token(self):
        return self.generate_token_jwt(1080)
    

    def generate_token_jwt(self, token_time):
        dt = datetime.now() + timedelta(seconds=token_time)

        token = jwt.encode({'username': self.username, 'exp': dt.utcfromtimestamp(dt.timestamp())
        }, settings.SECRET_KEY, algorithm='HS256')

        return token.decode('utf-8')
