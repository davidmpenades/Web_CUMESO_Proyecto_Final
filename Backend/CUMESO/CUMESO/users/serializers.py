from django.utils import timezone
from rest_framework import serializers
from .models import Users

class userSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True, required=False, allow_null=True)
    
    class Meta:
        model = Users
        fields = ( 'id', 'uuid', 'username', 'email','company','image', 'password','last_login','created_at', 'type')
        extra_kwargs = {'password': {'write_only': True}}
        
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

    def getProfile(context):
        username = context['username']
        input_uuid = context['uuid']

        try:
            user = Users.objects.get(username=username)

            if user.uuid != input_uuid:
                raise serializers.ValidationError('UUID mismatch: The provided UUID does not match the user\'s UUID.')

        except Users.DoesNotExist:
            raise serializers.ValidationError('*User not found.')
        
         
        return {
            'user': {
                'id': user.id,
                'username': user.username,
                'uuid': user.uuid,
                'email': user.email,
                'image': user.image.url if user.image else None,
                'company': user.company,
                'type': user.type,
                'last_login': user.last_login
            },
            'token': user.token,           
        }
        
    def update(self, instance, validated_data):
        
        # Actualizar campos estándar
        for attr, value in validated_data.items():
            if attr != 'image':  # Si estás manejando la imagen en la vista, exclúyela aquí
                setattr(instance, attr, value)
        
        # Manejar la contraseña adecuadamente, si se incluye en la actualización
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])

        instance.save()
        return instance