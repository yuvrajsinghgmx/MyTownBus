import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";


export default function Navbar() {
  const router = useRouter();
  const size = 24;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/')}>
      <Ionicons name="home-outline" size={24} color="red" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/bookings')}>
      <Ionicons name="calendar-outline" size={size} color="red" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/help')}>
     <Ionicons name="help-outline" size={size} color="red" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/profile')}>
      <Ionicons name="person-outline" size={size} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingBottom:20,
  },
  navItem: {
    fontSize: 16,
    color: 'blue',
  },
});
