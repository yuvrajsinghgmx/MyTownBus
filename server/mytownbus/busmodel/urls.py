# urls.py
from django.urls import path
from .views import FindScheduledTripsView ,SignupView ,LoginView,UserProfileView,LogoutView,AvailableSeatsView,BookSeatsView,ConfirmBookingView,SeatCreateView
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

    path('api/signup/', SignupView.as_view(), name='signup'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/profile/', UserProfileView.as_view(), name='user-profile'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/seats/<int:schedule_id>/available/', AvailableSeatsView.as_view(), name='available-seats'),
    path('api/seats/book/', BookSeatsView.as_view(), name='book-seats'),
    path('api/booking/<str:booking_id>/confirm/', ConfirmBookingView.as_view(), name='confirm-booking'),
    path('api/seats/', SeatCreateView.as_view(), name='seat-create'),
]
