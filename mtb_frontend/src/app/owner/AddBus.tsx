import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';

const AddBus: React.FC = () => {
  const tok = "1c2fa151c70f155e4ae9f52c985ab3a9ad1d56cd"
  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [busType, setBusType] = useState('');
  const [totalSeats, setTotalSeats] = useState('');
  const [stops, setStops] = useState([{ stop_name: '', arrival_time: '', departure_time: '' }]);
  const [availabilityDates, setAvailabilityDates] = useState(['']);
  const [seatTypes, setSeatTypes] = useState([{ seat_type: 'AC', available_seats: 10, price_per_seat: 100 }]);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        alert('Please log in to continue.');
        router.push('../auth/Login');
      }
    };
    checkAuthentication();
  }, []);

  const handleAddBus = async () => {
    if (!name || !registrationNumber || !totalSeats) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.post(
        'http://192.168.1.75:8000/api/buses/add/',
        {
          name,
          registration_number: registrationNumber,
          bus_type: busType || "AC",  // Default to "AC" if not selected
          total_seats: parseInt(totalSeats, 10),
          stops: stops,
          availability_dates: availabilityDates,
          seat_types: seatTypes,
        },
        { headers: { Authorization: `Token ${token}` } }
      );
      console.log(response.data);
      Alert.alert('Success', 'Bus added successfully!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error adding bus.');
    }
  };

  // Function to handle adding a stop
  const addStop = () => {
    setStops([...stops, { stop_name: '', arrival_time: '', departure_time: '' }]);
  };

  // Function to handle adding a bus availability date
  const addAvailability = () => {
    setAvailabilityDates([...availabilityDates, '']);
  };

  // Function to handle adding a seat type
  const addSeatType = () => {
    setSeatTypes([...seatTypes, { seat_type: 'AC', available_seats: 10, price_per_seat: 100 }]);
  };

  return (
    <ScrollView className="flex-1 p-5 bg-gray-100">
      <Text className="text-2xl font-bold mb-4">Add Bus</Text>
      
      {/* Bus Name */}
      <TextInput
        placeholder="Enter bus name"
        value={name}
        onChangeText={setName}
        className="border-b mb-4 p-2"
      />

      {/* Registration Number */}
      <TextInput
        placeholder="Enter registration number"
        value={registrationNumber}
        onChangeText={setRegistrationNumber}
        className="border-b mb-4 p-2"
      />

      {/* Bus Type Dropdown */}
      <TextInput
        placeholder="Enter Bus Type (AC, Non-AC, etc.)"
        value={busType}
        onChangeText={setBusType}
        className="border-b mb-4 p-2"
      />

      {/* Total Seats */}
      <TextInput
        placeholder="Enter total seats"
        value={totalSeats}
        onChangeText={setTotalSeats}
        keyboardType="numeric"
        className="border-b mb-4 p-2"
      />

      {/* Stops Section */}
      <Text className="text-xl mb-2">Stops</Text>
      {stops.map((stop, index) => (
        <View key={index} className="mb-4">
          <TextInput
            placeholder="Stop Name"
            value={stop.stop_name}
            onChangeText={(text) => {
              const updatedStops = [...stops];
              updatedStops[index].stop_name = text;
              setStops(updatedStops);
            }}
            className="border-b mb-2 p-2"
          />
          <TextInput
            placeholder="Arrival Time (YYYY-MM-DD HH:MM)"
            value={stop.arrival_time}
            onChangeText={(text) => {
              const updatedStops = [...stops];
              updatedStops[index].arrival_time = text;
              setStops(updatedStops);
            }}
            className="border-b mb-2 p-2"
          />
          <TextInput
            placeholder="Departure Time (YYYY-MM-DD HH:MM)"
            value={stop.departure_time}
            onChangeText={(text) => {
              const updatedStops = [...stops];
              updatedStops[index].departure_time = text;
              setStops(updatedStops);
            }}
            className="border-b mb-2 p-2"
          />
        </View>
      ))}
      <Button title="Add Stop" onPress={addStop} className="mt-2" />

      {/* Availability Dates */}
      <Text className="text-xl mt-4 mb-2">Availability Dates</Text>
      {availabilityDates.map((date, index) => (
        <View key={index} className="mb-4">
          <TextInput
            placeholder="Enter availability date (YYYY-MM-DD)"
            value={date}
            onChangeText={(text) => {
              const updatedDates = [...availabilityDates];
              updatedDates[index] = text;
              setAvailabilityDates(updatedDates);
            }}
            className="border-b mb-2 p-2"
          />
        </View>
      ))}
      <Button title="Add Availability" onPress={addAvailability} className="mt-2" />

      {/* Seat Types */}
      <Text className="text-xl mt-4 mb-2">Seat Types</Text>
      {seatTypes.map((seat, index) => (
        <View key={index} className="mb-4">
          <TextInput
            placeholder="Seat Type (AC, Non-AC, etc.)"
            value={seat.seat_type}
            onChangeText={(text) => {
              const updatedSeats = [...seatTypes];
              updatedSeats[index].seat_type = text;
              setSeatTypes(updatedSeats);
            }}
            className="border-b mb-2 p-2"
          />
          <TextInput
            placeholder="Available Seats"
            value={String(seat.available_seats)}
            onChangeText={(text) => {
              const updatedSeats = [...seatTypes];
              updatedSeats[index].available_seats = parseInt(text, 10);
              setSeatTypes(updatedSeats);
            }}
            keyboardType="numeric"
            className="border-b mb-2 p-2"
          />
          <TextInput
            placeholder="Price Per Seat"
            value={String(seat.price_per_seat)}
            onChangeText={(text) => {
              const updatedSeats = [...seatTypes];
              updatedSeats[index].price_per_seat = parseFloat(text);
              setSeatTypes(updatedSeats);
            }}
            keyboardType="numeric"
            className="border-b mb-2 p-2"
          />
        </View>
      ))}
      <Button title="Add Seat Type" onPress={addSeatType} className="mt-2" />

      {/* Add Bus Button */}
      <Button title="Add Bus" onPress={handleAddBus} className="mt-4" />
    </ScrollView>
  );
};

export default AddBus;
