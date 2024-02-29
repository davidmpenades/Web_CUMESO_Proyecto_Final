from rest_framework import serializers
from .models import Users

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ( 'id', 'uuid', 'username', 'email','company', 'password', 'type')

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
                'type': user.type
            },
            'token': user.token,
            'ref_token': user.ref_token,
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

        return {
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'company': user.company,
                'type': user.type
            },
            'token': user.token,
            'ref_token': user.ref_token,
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
                'company': user.company,
                'type': user.type
            },
            'token': user.token,
            'ref_token': user.ref_token,
        }

    def refreshToken(context):
        username = context['username']

        try:
            user = Users.objects.get(username=username)
        except:
            raise serializers.ValidationError('Username not valid.')

        return {
            'token': user.token
        }
