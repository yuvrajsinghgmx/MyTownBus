from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Bus, Route, Booking ,Profile,User
from .serializers import BusSerializer, RouteSerializer, BookingSerializer ,UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import random
import string

def generate_unique_bus_id():
    while True:
        bus_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=7))
        if not Profile.objects.filter(bus_id=bus_id).exists():
            return bus_id







class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'user_id': token.user_id, 'username': token.user.username,'user_type': token.user.profile.user_type})

class BookBusView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Bus booked successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CancelBookingView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, booking_id):
        try:
            booking = Booking.objects.get(id=booking_id)
            booking.delete()
            return Response({'message': 'Booking canceled successfully!'}, status=status.HTTP_204_NO_CONTENT)
        except Booking.DoesNotExist:
            return Response({'error': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)


class AddBusView(APIView):
    
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = request.user
        profile = user.profile 
        data = request.data.copy()
        data['bus_id'] = profile.bus_id
        serializer = BusSerializer(data=data)
        print(f"{profile.bus_id}")
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Bus added successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteBusView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, bus_id):
        try:
            bus = Bus.objects.get(id=bus_id)
            bus.delete()
            return Response({'message': 'Bus deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
        except Bus.DoesNotExist:
            return Response({'error': 'Bus not found'}, status=status.HTTP_404_NOT_FOUND)
# API View for Buses
class BusList(APIView):
    def get(self, request):
        buses = Bus.objects.all()
        serializer = BusSerializer(buses, many=True)
        return Response(serializer.data)

# API View for Routes
class RouteList(APIView):
    def get(self, request):
        routes = Route.objects.all()
        serializer = RouteSerializer(routes, many=True)
        return Response(serializer.data)

# API View for Bookings
class BookingList(APIView):
    def post(self, request):
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserRegistrationView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email', '')
        user_type = request.data.get('user_type')
        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        bus_id = generate_unique_bus_id()
        print(f"{bus_id}")
        user = User.objects.create_user(username=username, password=password, email=email)
        Profile.objects.create(user=user, user_type=user_type, bus_id=bus_id)
        return Response({
            'message': 'User registered successfully',
            'username': username,
            'bus_id': bus_id
        }, status=status.HTTP_201_CREATED)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
            return Response({
                'user_type': profile.user_type,
                'phone_number': profile.phone_number,
                'address': profile.address,
            })
        except Profile.DoesNotExist:
            return Response({'error': 'Profile not found.'}, status=status.HTTP_404_NOT_FOUND)

def home(request):
    return render(request, 'bus_booking/home.html')
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user_type = request.data.get('user_type')
            Profile.objects.create(user=user, user_type=user_type)

            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = Profile.objects.get(user=request.user)
        
        # Ensure the user is an Admin
        if profile.user_type != 'Admin':
            return Response({"error": "Only admins can access this."}, status=status.HTTP_403_FORBIDDEN)

        # Perform admin tasks here
        # e.g., view all buses, users, etc.
        return Response({"message": "Admin tasks can be performed here."})