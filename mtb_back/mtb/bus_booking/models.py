from django.db import models
from django.contrib.auth.models import User
import random
import string
from django.contrib import admin
from django.db import models
from datetime import datetime

class SeatType(models.Model):
    SEAT_CHOICES = [
        ('AC', 'AC'),
        ('Non-AC', 'Non-AC'),
        ('Sleeper', 'Sleeper'),
        ('Sleeper Non-AC', 'Sleeper Non-AC'),
    ]
    
    bus = models.ForeignKey('Bus', related_name='seat_types', on_delete=models.CASCADE)
    seat_type = models.CharField(max_length=50, choices=SEAT_CHOICES)
    available_seats = models.IntegerField()
    price_per_seat = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.seat_type} - {self.available_seats} seats"


class Profile(models.Model):
    USER_TYPES = (
        ('Owner', 'Owner'),
        ('Customer', 'Customer'),
        ('Admin', 'Admin'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=10, choices=USER_TYPES)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True)
    bus_id = models.CharField(max_length=7, unique=True)  # Unique to each user

    def __str__(self):
        return f"{self.user.username} ({self.user_type})"

class Bus(models.Model):
    name = models.CharField(max_length=100)
    registration_number = models.CharField(max_length=15, unique=True)
    bus_type = models.CharField(
        max_length=50, 
        choices=[('AC', 'AC'), ('Non-AC', 'Non-AC'), ('Sleeper', 'Sleeper'), ('Semi-Sleeper', 'Semi-Sleeper')]
    )
    total_seats = models.IntegerField()
    is_active = models.BooleanField(default=True)
    bus_id = models.CharField(max_length=7) 

    def __str__(self):
        return f"{self.name} ({self.registration_number})"

# Route Model
class Route(models.Model):
    source = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    duration = models.DurationField()
    distance = models.FloatField(help_text="Distance in kilometers")

    def __str__(self):
        return f"{self.source} to {self.destination}"

# Bus Schedule
class BusSchedule(models.Model):
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    price_per_seat = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.bus.name} ({self.route}) - {self.departure_time}"

# Seat Model
class Seat(models.Model):
    schedule = models.ForeignKey(BusSchedule, on_delete=models.CASCADE)
    seat_number = models.CharField(max_length=10)
    is_booked = models.BooleanField(default=False)

    def __str__(self):
        return f"Seat {self.seat_number} - {'Booked' if self.is_booked else 'Available'}"

# Booking Model
class Booking(models.Model):
    customer = models.ForeignKey(Profile, on_delete=models.CASCADE, limit_choices_to={'user_type': 'Customer'})
    schedule = models.ForeignKey(BusSchedule, on_delete=models.CASCADE)
    seat = models.OneToOneField(Seat, on_delete=models.CASCADE)
    booking_date = models.DateTimeField(auto_now_add=True)
    is_confirmed = models.BooleanField(default=True)

    def __str__(self):
        return f"Booking {self.id} - {self.customer.user.username} - Seat {self.seat.seat_number}"

# Feedback/Review Model
class Feedback(models.Model):
    customer = models.ForeignKey(Profile, on_delete=models.CASCADE, limit_choices_to={'user_type': 'Customer'})
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)], help_text="Rate between 1 and 5")
    comment = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback by {self.customer.user.username} for {self.bus.name}"

class BusAdmin(admin.ModelAdmin):
    list_display = ['bus_id', 'name', 'registration_number', 'bus_type', 'total_seats', 'is_active']
    search_fields = ['name', 'registration_number', 'bus_id']
    list_filter = ['bus_type', 'is_active']