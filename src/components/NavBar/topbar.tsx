import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  rightIcon?: {
    name: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
}
const Header: React.FC<HeaderProps> = ({ title, onBackPress, rightIcon }) => {
  return (
    <View style={styles.container}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
          <Ionicons name="arrow-back-outline" size={24}  />
        </TouchableOpacity>
      )}
      <Text className="font-bold" style={styles.title}>{title}</Text>
      {rightIcon && (
        <TouchableOpacity onPress={rightIcon.onPress} style={styles.iconButton}>
          <Ionicons name={rightIcon.name} size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    flex: 1,
    textAlign: "center",
  },
  iconButton: {
    padding: 8,
  },
});
