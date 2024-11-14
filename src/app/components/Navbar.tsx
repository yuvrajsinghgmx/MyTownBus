// components/Navbar.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { HomeIcon, SearchIcon, ProfileIcon } from './Icons';

const Navbar = () => {
  const router = useRouter();

  return (
    <View className="flex-row justify-around items-center bg-white py-4 border-t border-gray-200">
      <TouchableOpacity onPress={() => router.push('/search')} className="flex items-center">
        <HomeIcon width={24} height={24} color="#4B5563" />
        <Text className="text-xs text-black mt-1">Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/search')} className="flex items-center">
        <SearchIcon width={24} height={24} color="#4B5563" />
        <Text className="text-xs text-gray-800 mt-1">Search</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/profile')} className="flex items-center">
        <ProfileIcon width={24} height={24} color="#4B5563" />
        <Text className="text-xs text-gray-800 mt-1">Profile</Text>
      </TouchableOpacity>
    </View>
    
  );
};

export default Navbar;
