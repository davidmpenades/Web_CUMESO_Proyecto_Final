from django.urls import path
from .views import UserAdminView, UserView, UserInfoView

urlpatterns = [
    #users
    path('register/', UserView.as_view({'post': 'register'})),
    path('login/', UserView.as_view({'post': 'login'})),
    path('user/', UserInfoView.as_view({'get': 'getUser'})),
    path('user/<str:uuid>', UserAdminView.as_view({'get': 'getUser'})),
    path('users/', UserAdminView.as_view({'get': 'getAllUsers'})),
    path('user/<str:uuid>', UserAdminView.as_view({'delete': 'delete'})),
]