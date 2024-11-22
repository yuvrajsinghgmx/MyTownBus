import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import Navbar from "../components/NavBar/navbar";

export default function Layout() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Stack screenOptions={{ headerShown: false }} />
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  navbarContainer: {
    backgroundColor: "#FFFFFF",
  },
});
