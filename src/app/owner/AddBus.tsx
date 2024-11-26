import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';

const AddBus: React.FC = () => {
  const tok = "1c2fa151c70f155e4ae9f52c985ab3a9ad1d56cd"
  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [busType, setBusType] = useState('');
  const [totalSeats, setTotalSeats] = useState('');
  const [features, setFeatures] = useState('');

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
          bus_type: "AC",
          total_seats: parseInt(totalSeats, 10),
          features: JSON.parse(features || '{}'),
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

  return (
    <View className="flex-1 p-5 bg-gray-100">
      <Text className="text-2xl font-bold mb-4">Add Bus</Text>
      <Input label="Bus Name" value={name} onChangeText={setName} placeholder="Enter bus name" />
      <Input
        label="Registration Number"
        value={registrationNumber}
        onChangeText={setRegistrationNumber}
        placeholder="Enter registration number"
      />
      {/* <SelectDropdown
        data={['AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper']}
        onSelect={(selectedItem: string) => setBusType(selectedItem)}
        defaultButtonText="Select Bus Type"
        buttonTextAfterSelection={(item: string) => item || 'Select Bus Type'}
        rowTextForSelection={(item: string) => item}
        buttonStyle={{ marginTop: 10 }}
      /> */}

      <Input
        label="Total Seats" 
        value={totalSeats}
        onChangeText={setTotalSeats}
        placeholder="Enter total seats"
      />
      <Input
        label="Features (JSON format)"
        value={features}
        onChangeText={setFeatures}
        placeholder='e.g., {"WiFi": true, "Charging Points": true}'
      />
      <Button title="Add Bus" onPress={handleAddBus} className="mt-4" />
    </View>
  );
};

export default AddBus;
