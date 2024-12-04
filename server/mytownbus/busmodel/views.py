# views.py
from rest_framework import generics
from .models import Category, Location, Bus, Schedule, Booking
from .serializers import CategorySerializer, LocationSerializer, BusSerializer, ScheduleSerializer, BookingSerializer
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
