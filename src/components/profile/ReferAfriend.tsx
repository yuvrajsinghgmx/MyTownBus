import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const ReferAFriend = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="home" size={24} color="#FF5722" />
      <Text style={styles.text}>Refer A Friend</Text>
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

export default ReferAFriend;
