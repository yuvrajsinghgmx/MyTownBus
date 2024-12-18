# views.py
import random
from django.db import transaction
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework import generics
from .models import Category, Location, Bus, Schedule, Booking , User , Seat
from .serializers import CategorySerializer, LocationSerializer, BusSerializer, ScheduleSerializer, BookingSerializer ,UserSerializer , SeatSerializer,NewScheduleSerializer,BookedSerializer
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
    permission_classes = [IsAuthenticated]
    def post(self, request):
        schedule_id = request.data.get('schedule_id')
        seat_numbers = request.data.get('seat_numbers', [])
        name = request.data.get('name')

        if not schedule_id or not seat_numbers or not name:
            return Response({"error": "Missing required fields: schedule_id, seat_numbers, or name."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                seats = Seat.objects.filter(seat_number__in=seat_numbers, schedule_id=schedule_id, status='1')
                if seats.count() != len(seat_numbers):
                    return Response({"error": "Some seats are already booked or unavailable."}, status=status.HTTP_400_BAD_REQUEST)
                seats.update(status='2')
                booking = Booking.objects.create(
                    code=f"BOOK-{random.randint(1000, 9999)}",
                    name=name,
                    schedule_id=schedule_id,
                    status='1',
                    seat_numbers = seat_numbers,
                )
                booking.seats.add(*seats)
                booking.save()
                return Response({
                    "message": "Seats successfully booked!",
                    "booking_code": booking.code,
                    "booked_seats": [seat.seat_number for seat in seats]
                }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ConfirmBookingView(APIView):
    def post(self, request, booking_id):
        seat_numbers = request.data.get('seat_numbers', [])
        try:
            seats = Seat.objects.filter(seat_number__in=seat_numbers, status='2')
            booking = Booking.objects.get(code=booking_id, status='1')
            booking.status = '2'
            booking.payment_reference = request.data.get('payment_reference', 'N/A')
            booking.finalize_booking()
            booking.save()
            seats.update(status = '3')

            return Response({"message": "Booking confirmed successfully."}, status=status.HTTP_200_OK)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found or already confirmed."}, status=status.HTTP_404_NOT_FOUND)
        

class SeatCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SeatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AddScheduleView(APIView):
    def post(self, request):
        serializer = NewScheduleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Schedule added successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BookedView(APIView):
    def get(self,request):
        name = request.query_params.get('name')
        if not name:
            return Response({"error": "Name parameter is required"}, status=400)
        bookings = Booking.objects.filter(name__icontains=name)
        serializer = BookedSerializer(bookings, many=True)
        
        return Response({"bookings": serializer.data})