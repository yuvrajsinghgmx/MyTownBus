import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mtoken,setmt] = useState('Not Logged IN');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.75:8000/api/login/', {
        username,
        password,
      });
      const { token } = response.data;
      setmt(token || 'Login Failed');

      // Save the token for future authenticated requests
      await AsyncStorage.setItem('authToken', token);

      alert('Login successful!');
    } catch (error) {
      console.error(error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <View className="flex-1 p-5 bg-gray-100">
      <Text className="text-2xl font-bold mb-4">Login</Text>
      <Input label="Username" value={username} onChangeText={setUsername} placeholder="Enter username" />
      <Input label="Password" value={password} onChangeText={setPassword} placeholder="Enter password" secureTextEntry />
      <Button title="Login" onPress={handleLogin} className="mt-4" />
      <Text className="text-2xl font-bold mb-4">{mtoken}</Text>
    </View>
  );
};

export default Login;
