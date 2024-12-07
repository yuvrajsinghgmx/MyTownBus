
from rest_framework import serializers
from .models import Category, Location, Bus, Schedule, Booking,User 

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'status', 'date_created', 'date_updated']

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'location', 'status', 'date_created', 'date_updated']

class BusSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Bus
        fields = ['id', 'category', 'bus_number', 'seats', 'status', 'date_created', 'date_updated']

class ScheduleSerializer(serializers.ModelSerializer):
    bus = BusSerializer()
    depart = LocationSerializer()
    destination = LocationSerializer()

    class Meta:
        model = Schedule
        fields = ['id', 'code', 'bus', 'depart', 'destination', 'schedule', 'fare', 'status', 'date_created', 'date_updated']

class BookingSerializer(serializers.ModelSerializer):
    schedule = ScheduleSerializer()

    class Meta:
        model = Booking
        fields = ['id', 'code', 'name', 'schedule', 'seats', 'status', 'date_created', 'date_updated']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'age', 'gender', 'phone', 'address']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def update(self, instance, validated_data):
        """Update user instance."""
        instance.username = validated_data.get('username', instance.username)
        instance.name = validated_data.get('name', instance.name)
        instance.age = validated_data.get('age', instance.age)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.address = validated_data.get('address', instance.address)
        instance.save()
        return instance