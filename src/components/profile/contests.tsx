import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const Contests = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="home" size={24} color="#FF9800" />
      <Text style={styles.text}>Contests</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default Contests;
