from rest_framework import permissions
from CUMESO.CUMESO.users.models import Users

class IsAdmin(permissions.BasePermission):
    # message = "You aren't an admin"

    def has_permission(self, request, view):
        try:
            user = Users.objects.get(username=request.user)
            print(f"User: {user}")
            
            if user.type == 'admin':
                return True            
            return False
        except Users.DoesNotExist:
            print(f"User with username '{request.user}' not found.")
            return False
        except Exception as e:
            print(f"Error: {e}")
            return False
