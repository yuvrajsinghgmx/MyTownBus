
from rest_framework import serializers
from .models import Category, Location, Bus, Schedule, Booking,User , Seat
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField

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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'name', 'age', 'gender', 'phone', 'address']
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            name=validated_data['name'],
            age=validated_data.get('age'),
            gender=validated_data.get('gender'),
            phone=validated_data['phone'],
            address=validated_data.get('address'),
        )
        return user


class EditUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password', 'name', 'age', 'gender', 'phone', 'address']
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
        return instance
    
class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ['id', 'schedule', 'seat_number', 'status', 'date_created', 'date_updated']

class BookingSerializer(serializers.ModelSerializer):
    seats = SeatSerializer(many=True)

    class Meta:
        model = Booking
        fields = ['id', 'code', 'name', 'schedule', 'seats', 'status', 'payment_reference', 'date_created', 'date_updated']

    def create(self, validated_data):
        seats_data = validated_data.pop('seats')
        booking = Booking.objects.create(**validated_data)
        for seat_data in seats_data:
            seat = Seat.objects.get(id=seat_data['id'])
            seat.status = '3'  # Mark as booked
            seat.save()
            booking.seats.add(seat)
        return booking
    
class NewScheduleSerializer(serializers.ModelSerializer):
    bus = PrimaryKeyRelatedField(queryset=Bus.objects.all())
    depart = PrimaryKeyRelatedField(queryset=Location.objects.all())
    destination = PrimaryKeyRelatedField(queryset=Location.objects.all())

    class Meta:
        model = Schedule
        fields = ['code', 'bus', 'depart', 'destination', 'schedule', 'fare', 'status','id']

class BookedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            'name', 'schedule','seat_numbers', 'status', 
            'payment_reference', 'date_created',
        ]