import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// 1c2fa151c70f155e4ae9f52c985ab3a9ad1d56cd
const DeleteBus: React.FC = () => {
  const [busId, setBusId] = useState('');
  const tok = "1c2fa151c70f155e4ae9f52c985ab3a9ad1d56cd"
  const handleDeleteBus = async () => {
    try {
    const token = await AsyncStorage.getItem('authToken');
      const response = await axios.delete(`http://192.168.1.75:8000/api/buses/delete/${busId}/`,{ headers: { Authorization: `Token ${tok}` } });
      console.log(response.data);
      alert('Bus deleted successfully!');
    } catch (error) {
      console.error(error);
      alert('Error deleting bus.');
    }
  };

  return (
    <View className="flex-1 p-5 bg-gray-100">
      <Text className="text-2xl font-bold mb-4">Delete Bus</Text>
      <Input label="Bus ID" value={busId} onChangeText={setBusId} placeholder="Enter bus ID" />
      <Button title="Delete Bus" onPress={handleDeleteBus} className="mt-4" />
    </View>
  );
};

export default DeleteBus;
