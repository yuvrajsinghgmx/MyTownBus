from django.urls import path
from . import views
from .views import BusList, RouteList, BookingList
from .views import UserRegistrationView ,AddBusView ,BookBusView ,CancelBookingView,DeleteBusView,LoginView


urlpatterns = [
    path('', views.home, name='home'),
    path('api/buses/', BusList.as_view(), name='bus-list'),
    path('api/routes/', RouteList.as_view(), name='route-list'),
    path('api/bookings/', BookingList.as_view(), name='booking-list'),
    path('api/register/', UserRegistrationView.as_view(), name='user-register'),
    path('api/bookings/book/', BookBusView.as_view(), name='book-bus'),
    path('api/bookings/cancel/<int:booking_id>/', CancelBookingView.as_view(), name='cancel-booking'),
    path('api/buses/add/', AddBusView.as_view(), name='add-bus'),
    path('api/buses/delete/<int:bus_id>/', DeleteBusView.as_view(), name='delete-bus'),
    path('api/login/', LoginView.as_view(), name='login'),

]
