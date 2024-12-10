# admin.py
from django.contrib import admin
from .models import Category, Location, Bus, Schedule, Booking ,User ,Seat


class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'age']
    search_fields = ['name']
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'status', 'date_created', 'date_updated']
    search_fields = ['name', 'description']

class LocationAdmin(admin.ModelAdmin):
    list_display = ['location', 'status', 'date_created', 'date_updated']
    search_fields = ['location']

class BusAdmin(admin.ModelAdmin):
    list_display = ['bus_number', 'category', 'seats', 'status', 'date_created', 'date_updated']
    search_fields = ['bus_number', 'category__name']

class ScheduleAdmin(admin.ModelAdmin):
    list_display = ['code', 'bus', 'depart', 'destination', 'schedule', 'fare', 'status', 'date_created', 'date_updated']
    search_fields = ['code', 'bus__bus_number', 'depart__location', 'destination__location']

class BookingAdmin(admin.ModelAdmin):
    list_display = ['id', 'code', 'seat_numbers','name', 'schedule','status', 'date_created']

    def get_seats(self, obj):
        return ", ".join([seat.seat_number for seat in obj.seats.all()])
    get_seats.short_description = 'Seats'


class SeatAdmin(admin.ModelAdmin):
    list_display = ['schedule_id','schedule','seat_number','status','date_created']

admin.site.register(Seat,SeatAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(Bus, BusAdmin)
admin.site.register(Schedule, ScheduleAdmin)
admin.site.register(Booking, BookingAdmin)
