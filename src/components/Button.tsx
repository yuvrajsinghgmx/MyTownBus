import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  className?: string; 
}

const Button: React.FC<ButtonProps> = ({ title, onPress, className }) => {
  return (
    <TouchableOpacity
      className={`bg-blue-500 py-3 px-4 rounded-lg ${className}`}
      onPress={onPress}
    >
      <Text className="text-white text-center font-bold">{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
