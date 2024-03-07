from django.utils import timezone
from rest_framework import serializers
from .models import Users

class userSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True, required=False, allow_null=True)
    
    class Meta:
        model = Users
        fields = ( 'id', 'uuid', 'username', 'email','company','image', 'password','last_login','created_at', 'type')

    def register(context):
        email = context['email']
        password = context['password']

        email_exist = len(Users.objects.filter(email=email))

        if (email_exist > 0):
            raise serializers.ValidationError('*email already exists.')

        user = Users.objects.create_user(email=email, password=password, username=context['username'], company=context['company'])

        return {
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'company': user.company,
                'image': user.image.url if user.image else None,
                'type': user.type,  
                'created_at': user.created_at,             
            },
            'token': user.token,
            
        }

    def login(context):
        username = context['username']
        password = context['password']

        try:
            user = Users.objects.get(username=username)
        except:
            raise serializers.ValidationError('*User not found.')

        if not user.check_password(password):
            raise serializers.ValidationError('*Wrong username or password.')
        
        user.last_login = timezone.now()
        user.save(update_fields=['last_login'])

        return {
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'company': user.company,
                'image': user.image.url if user.image else None,
                'type': user.type,
                'last_login': user.last_login                
            },
            'token': user.token,
            
        }

    def getUser(context):
        username = context['username']
        print(username)

        try:
            user = Users.objects.get(username=username)
        except:
            raise serializers.ValidationError('*User not found.')

        return {
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'image': user.image.url if user.image else None,
                'company': user.company,
                'type': user.type,
                'last_login': user.last_login
            },
            'token': user.token,           
        }

