import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface CheckboxProps {
  label: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, value, onValueChange }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onValueChange(!value)}
    >
      <View style={[styles.box, value && styles.boxChecked]} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  box: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
    borderRadius: 4,
  },
  boxChecked: {
    backgroundColor: "#FF4A4A",
  },
  label: {
    fontSize: 14,
    color: "#333",
  },
});
