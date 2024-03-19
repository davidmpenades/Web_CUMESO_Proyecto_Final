from rest_framework.response import Response
from rest_framework import viewsets, status
from .serializers import userSerializer
from .models import Users
from rest_framework.permissions import (AllowAny, IsAuthenticated)
from CUMESO.CUMESO.core.permissions import IsAdmin
from django.shortcuts import get_object_or_404
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from PIL import Image
import io
from django.core.files.base import ContentFile
from rest_framework.decorators import api_view
from CUMESO.CUMESO.machine.models import Machine
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser

def convert_to_webp(image_input):
        image = Image.open(image_input)
        with io.BytesIO() as output:
            image.save(output, format="WEBP")
            return output.getvalue()
        
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

    def logout(self, request):
        return Response()

class UserAdminView(viewsets.GenericViewSet):
    queryset = Users.objects.all() 
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
    action(detail=True, methods=['patch'])
    def assign_machines(self, request, pk=None):
        user = self.get_object()
        machine_ids = request.data.get('machines', [])
        
        # Asegúrate de que todas las máquinas existan
        machines = Machine.objects.filter(id__in=machine_ids)
        if len(machines) != len(machine_ids):
            return Response({'error': 'Una o más máquinas no existen'}, status=status.HTTP_404_NOT_FOUND)

        # Asigna las máquinas al usuario
        user.machines.set(machines)
        return Response({'message': 'Máquinas asignadas correctamente al usuario'})
    
class UserProtectedView(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    def get_profile(self, request):
        user = request.user
        serializer = userSerializer(user) 
        return Response(serializer.data)

    def update_profile(self, request):
        user = request.user
        serializer = userSerializer(user, data=request.data, partial=True, context={'request': request})

        if serializer.is_valid():
            user = serializer.save()

            if 'image' in request.FILES:
                if user.image and not user.image.name.startswith('path/to/default/image'):
                    user.image.delete(save=False) 
                
                image_file = request.FILES['image']
                # Convierte la imagen a WEBP
                converted_image = convert_to_webp(image_file)
                # Guarda la imagen convertida en el campo de imagen del usuario
                user.image.save(f'{user.username}.webp', ContentFile(converted_image), save=True)

            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

   

    def delete_profile(self, request):
        user = request.user
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
        