from django.db import models
from re import I
from unicodedata import category
from django.db import models
from django.utils import timezone
from django.dispatch import receiver
from django.db.models import Sum
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin ,AbstractUser
import random
from django.utils.timezone import now


class User(AbstractUser):
    name = models.CharField(max_length=150)
    age = models.PositiveIntegerField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], null=True, blank=True)
    phone = models.CharField(max_length=15, unique=True)
    address = models.TextField(null=True, blank=True)

class Category(models.Model):
    name = models.CharField(max_length=250)
    description = models.TextField()
    status = models.CharField(max_length=2, choices=(('1','Active'),('2','Inactive')), default=1)
    date_created = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Location(models.Model):
    location = models.CharField(max_length=250)
    status = models.CharField(max_length=2, choices=(('1','Active'),('2','Inactive')), default=1)
    date_created = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.location

class Bus(models.Model):
    category = models.ForeignKey(Category,on_delete=models.CASCADE, blank= True, null = True)
    bus_number = models.CharField(max_length=250)
    seats = models.FloatField(max_length=5, default=0)
    status = models.CharField(max_length=2, choices=(('1','Active'),('2','Inactive')), default=1)
    date_created = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.bus_number

class Schedule(models.Model):
    code = models.CharField(max_length=100)
    bus = models.ForeignKey(Bus,on_delete=models.CASCADE)
    depart = models.ForeignKey(Location,on_delete=models.CASCADE, related_name='depart_location')
    destination = models.ForeignKey(Location,on_delete=models.CASCADE, related_name='destination')
    schedule= models.DateTimeField()
    fare= models.FloatField()
    status = models.CharField(max_length=2, choices=(('1','Active'),('2','Cancelled')), default=1)
    date_created = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.code + ' - ' + self.bus.bus_number)

    def count_available(self):
        booked = Booking.objects.filter(schedule=self).aggregate(Sum('seats'))['seats__sum']
        return self.bus.seats - booked

class Seat(models.Model):
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)
    seat_number = models.CharField(max_length=10)
    status = models.CharField(
        max_length=2,
        choices=[('1', 'Available'), ('2', 'Reserved'), ('3', 'Booked')],
        default='1'
    )   
    date_created = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.schedule} - Seat {self.seat_number}"



class Booking(models.Model):
    code = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=250)
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)
    seats = models.ManyToManyField(Seat)
    seat_numbers = models.JSONField(default=list)
    status = models.CharField(
        max_length=2,
        choices=(('1', 'Pending'), ('2', 'Paid')),
        default='1'
    )
    payment_reference = models.CharField(max_length=100, null=True, blank=True)
    date_created = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.code} - {self.name}"

    def total_payable(self):
        return self.seats.count() * self.schedule.fare

    def finalize_booking(self):
        if self.status == '2':
            self.seats.update(status='3')


