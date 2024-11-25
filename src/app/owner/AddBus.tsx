import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { router } from 'expo-router';



const AddBus: React.FC = () => {
    useEffect(() => {
        const checkAuthentication = async () => {
          const token = await AsyncStorage.getItem('authToken');
          if (!token) {
            alert('Please log in to continue.');
            router.push('../auth/Login')
          }
        };
        checkAuthentication();
      }, []);
      
    
  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');

  const handleAddBus = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await axios.post('http://192.168.1.75:8000/api/buses/add/', {
        name,
        registration_number: registrationNumber,
      },
      { headers: { Authorization: `Token ${token}` } }

   );
      console.log(response.data);
      alert('Bus added successfully!');
    } catch (error) {
      console.error(error);
      alert('Error adding bus.');
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
      <Button title="Add Bus" onPress={handleAddBus} className="mt-4" />
    </View>
  );
};

export default AddBus;
