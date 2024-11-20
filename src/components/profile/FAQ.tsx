import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const FAQs = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="help-outline" size={24} color="#00BCD4" />
      <Text style={styles.text}>FAQs</Text>
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

export default FAQs;
