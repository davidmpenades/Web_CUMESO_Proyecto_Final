from django.urls import path
from . import views

urlpatterns = [
    #admin
    path('machine/', views.MachineList.as_view({'post': 'create'})),     
    path('machine/<slug:slug>/', views.MachineList.as_view({'get': 'getBySlug'})),
    path('machineDel/<slug:slug>/', views.MachineList.as_view({'delete': 'delete'})),
    path('machineUpd/<slug:slug>/', views.MachineList.as_view({'patch': 'partial_update'})),
    path('machineImage/<slug:slug>/', views.MachineList.as_view({'get': 'getMachineImage'})),
    path('machineImageUpd/<slug:slug>/', views.MachineList.as_view({'patch': 'updateVisibility'})),
    #public
    path('machines/', views.MachineList.as_view({'get': 'getAll'})),
]
