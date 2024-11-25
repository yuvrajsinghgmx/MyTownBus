import React from 'react';
import { TextInput, View, Text } from 'react-native';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
}

const Input: React.FC<InputProps> = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <View className="mb-4">
      <Text className="text-lg font-bold mb-1">{label}</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default Input;
