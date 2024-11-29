import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import axios from 'axios';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('Customer'); // Default user type

  const handleSubmit = async () => {
    // Validate input fields
    if (!username || !password) {
      Alert.alert('Error', 'Username and password are required');
      return;
    }

    try {
      const response = await axios.post('http://192.168.1.75:8000/api/register/', {
        username,
        password,
        email,
        user_type: userType,
      });

      Alert.alert('Success', response.data.message);
    } catch (error:unknown) {
      if (axios.isAxiosError(error)) {
        Alert.alert('Error', error.response?.data.error);
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  return (
    <ScrollView className="flex-1   bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4">Register</Text>
      
      <TextInput
        className="w-full border p-2 mb-3 rounded"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        className="w-full border p-2 mb-3 rounded"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TextInput
        className="w-full border p-2 mb-3 rounded"
        placeholder="Email (optional)"
        value={email}
        onChangeText={setEmail}
      />
      
      <View className="w-full mb-3">
        <Text className="text-gray-600 mb-2">User Type</Text>
        <View className="flex-row space-x-2">
          <Button title="Customer" onPress={() => setUserType('Customer')} />
          <Button title="Owner" onPress={() => setUserType('Owner')} />
          <Button title="Admin" onPress={() => setUserType('Admin')} />
        </View>
      </View>
      
      <Button title="Register" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default RegisterScreen;
