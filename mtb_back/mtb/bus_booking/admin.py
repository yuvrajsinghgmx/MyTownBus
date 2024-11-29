from django.contrib import admin
from .models import Profile, Bus, Route, BusSchedule, Seat, Booking, Feedback,BusAdmin  

admin.site.register(Profile)
admin.site.register(Bus,BusAdmin)
admin.site.register(Route)
admin.site.register(BusSchedule)
admin.site.register(Seat)
admin.site.register(Booking)
admin.site.register(Feedback)
