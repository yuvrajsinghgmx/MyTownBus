# views.py
import random
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework import generics
from .models import Category, Location, Bus, Schedule, Booking , User , Seat
from .serializers import CategorySerializer, LocationSerializer, BusSerializer, ScheduleSerializer, BookingSerializer ,UserSerializer , SeatSerializer
# views.py
from rest_framework import generics
from rest_framework.response import Response
from .models import Schedule, Location
from .serializers import ScheduleSerializer
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Schedule
from .serializers import ScheduleSerializer
from django.utils.dateparse import parse_datetime
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import status



class FindScheduledTripsView(APIView):
    def get(self, request):
        depart = request.query_params.get('depart')
        destination = request.query_params.get('destination')
        date = request.query_params.get('date')

        if not depart or not destination or not date:
            return Response(
                {"error": "depart, destination, and date are required parameters."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            date = parse_datetime(date)
        except ValueError:
            return Response({"error": "Invalid date format. Use ISO 8601 format."}, status=status.HTTP_400_BAD_REQUEST)

        schedules = Schedule.objects.filter(
            depart__location__icontains=depart,
            destination__location__icontains=destination,
            schedule__date=date.date(),
            status='1'
        )

        serializer = ScheduleSerializer(schedules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CategoryListCreate(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class LocationListCreate(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class LocationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class BusListCreate(generics.ListCreateAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer

class BusDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bus.objects.all()
    serializer_class = BusSerializer

class ScheduleListCreate(generics.ListCreateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

class ScheduleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

class BookingListCreate(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class BookingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User details updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """Log out the user by deleting their token."""
        try:
            request.user.auth_token.delete()
            return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response({'error': 'Token not found'}, status=status.HTTP_400_BAD_REQUEST)
        
class AvailableSeatsView(APIView):
    def get(self, request, schedule_id):
        seats = Seat.objects.filter(schedule_id=schedule_id)
        serializer = SeatSerializer(seats, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class BookSeatsView(APIView):
    def post(self, request):
        schedule_id = request.data.get('schedule_id')
        seat_ids = request.data # '1' for available.get('seat_ids', [])
        name = request.data.get('name')

        # Fetch available seats
        seats = Seat.objects.filter(id__in=seat_ids, schedule_id=schedule_id, status='1')

        if seats.count() != len(seat_ids):
            return Response({"error": "Some seats are already booked or unavailable."}, status=status.HTTP_400_BAD_REQUEST)
        seats.update(status='2')
        booking = Booking.objects.create(
            code=f"BOOK-{random.randint(1000, 9999)}",
            name=name,
            schedule_id=schedule_id,
            status='1'
        )
        booking.seats.set(seats)
        booking.save()

        return Response({
            "message": "Booking created successfully.",
            "booking_id": booking.id,
            "total_fare": booking.total_payable()
        }, status=status.HTTP_201_CREATED)

class ConfirmBookingView(APIView):
    def post(self, request, booking_id):
        try:
            booking = Booking.objects.get(id=booking_id, status='1')  # Pending payment
            booking.status = '2'  # '2' for paid
            booking.payment_reference = request.data.get('payment_reference', 'N/A')
            booking.finalize_booking()  # Mark seats as booked
            booking.save()

            return Response({"message": "Booking confirmed successfully."}, status=status.HTTP_200_OK)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found or already confirmed."}, status=status.HTTP_404_NOT_FOUND)