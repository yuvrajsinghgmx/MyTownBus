# urls.py
from django.urls import path
from .views import FindScheduledTripsView
from . import views



urlpatterns = [
    path('categories/', views.CategoryListCreate.as_view(), name='category-list'),
    path('categories/<int:pk>/', views.CategoryDetail.as_view(), name='category-detail'),
    
    path('locations/', views.LocationListCreate.as_view(), name='location-list'),
    path('locations/<int:pk>/', views.LocationDetail.as_view(), name='location-detail'),
    
    path('buses/', views.BusListCreate.as_view(), name='bus-list'),
    path('buses/<int:pk>/', views.BusDetail.as_view(), name='bus-detail'),
    
    path('schedules/', views.ScheduleListCreate.as_view(), name='schedule-list'),
    path('schedules/<int:pk>/', views.ScheduleDetail.as_view(), name='schedule-detail'),
    
    path('bookings/', views.BookingListCreate.as_view(), name='booking-list'),
    path('bookings/<int:pk>/', views.BookingDetail.as_view(), name='booking-detail'),



    path('api/scheduled-trips/', FindScheduledTripsView.as_view(), name='find_scheduled_trips'),
]
