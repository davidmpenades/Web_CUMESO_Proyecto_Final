from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import userSerializer
from .models import Users
from rest_framework.permissions import (AllowAny, IsAuthenticated)
from CUMESO.CUMESO.core.permissions import IsAdmin

class UserView(viewsets.GenericViewSet):
    def register(self, request):
        data = request.data
        print(request.data)
        serializer_context = {
            'username': data['username'],
            'email': data['email'],
            'company': data['company'],
            'password': data['password']
        }

        serializer = userSerializer.register(serializer_context)
        return Response(serializer)

    def login(self, request):
        data = request.data

        serializer_context = {
            'username': data['username'],
            'password': data['password']
        }
        
        serializer = userSerializer.login(serializer_context)
        return Response(serializer)

class UserInfoView(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)

    def getUser(self, request):
        username = request.user
        serializer_context = { 'username': username }
        serializer = userSerializer.getUser(context=serializer_context)
        return Response(serializer)

    def refreshToken(self, request):
        username = request.user
        serializer_context = { 'username': username }
        serializer = userSerializer.refreshToken(serializer_context)
        return Response(serializer)

    def logout(self, request):
        return Response()

class UserAdminView(viewsets.GenericViewSet):
    permission_classes = [IsAdmin]

    def getAllUsers(self, request):
        users = Users.objects.all()
        users_serializer = userSerializer(users, many=True)
        return Response(users_serializer.data)

    def getUser(self, request, uuid):
        user = Users.objects.get(uuid=uuid)
        user_serializer = userSerializer(user, many=False)
        return Response(user_serializer.data)

    def delete(self, request, uuid):
        user = Users.objects.get(uuid=uuid)
        print(user)
        user.delete()
        return Response({'data': 'User deleted successfully'})