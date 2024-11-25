import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import axios from 'axios';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.1.75:8000/api/register/', {
        username,
        email,
        password,
      });
      console.log(response.data);
      alert('User registered successfully!');
    } catch (error) {
      console.error(error);
      alert('Error during registration.');
    }
  };

  return (
    <View className="flex-1 p-5 bg-gray-100">
      <Text className="text-2xl font-bold mb-4">Register</Text>
      <Input label="Username" value={username} onChangeText={setUsername} placeholder="Enter username" />
      <Input label="Email" value={email} onChangeText={setEmail} placeholder="Enter email" />
      <Input label="Password" value={password} onChangeText={setPassword} placeholder="Enter password" secureTextEntry />
      <Button title="Register" onPress={handleRegister} className="mt-4" />
    </View>
  );
};

export default Register;
