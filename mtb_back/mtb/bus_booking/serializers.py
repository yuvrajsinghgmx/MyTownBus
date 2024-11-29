from rest_framework import serializers
from .models import Bus, Route, Booking ,Profile
from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    user_type = serializers.ChoiceField(choices=Profile.USER_TYPES)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user_data = validated_data
        user = User.objects.create_user(
            username=user_data['username'],
            email=user_data['email'],
            password=user_data['password']
        )
        profile = Profile.objects.create(
            user=user,
            user_type=user_data['user_type'],
        )
        return user

class BusSerializer(serializers.ModelSerializer):
    bus_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    class Meta:
        model = Bus
        fields = ['name', 'registration_number', 'bus_type', 'total_seats', 'is_active','bus_id']
        

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
