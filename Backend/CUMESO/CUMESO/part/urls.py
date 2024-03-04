from django.urls import path
from .views import PartList

urlpatterns = [
    path('part/', PartList.as_view({'post': 'create'})), 
    path('parts/', PartList.as_view({'get': 'getAll'})),
    path('parts/<slug:slug>', PartList.as_view({'get': 'getBySlug'})),
    path('part/<slug:slug>/', PartList.as_view({'delete': 'delete', 'put': 'update'})),
]