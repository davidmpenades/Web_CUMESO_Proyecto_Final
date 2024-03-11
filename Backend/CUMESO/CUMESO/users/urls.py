from django.urls import path
from .views import UserAdminView, UserView, UserInfoView, UserProtectedView

urlpatterns = [
    # Users
    path('register/', UserView.as_view({'post': 'register'})),
    path('login/', UserView.as_view({'post': 'login'})),
    path('user/', UserInfoView.as_view({'get': 'getUser'})),
    path('profile/', UserProtectedView.as_view({'get': 'get_profile'})),
    path('profile/update/', UserProtectedView.as_view({'patch': 'update_profile'})),
    path('profile/delete/', UserProtectedView.as_view({'delete': 'delete_profile'})),
    
    # Admin
    path('user/<str:uuid>/', UserAdminView.as_view({'get': 'getUser'})), 
    path('users/', UserAdminView.as_view({'get': 'getAllUsers'})),
    path('user/delete/<str:uuid>/', UserAdminView.as_view({'delete': 'delete'})), 
]

