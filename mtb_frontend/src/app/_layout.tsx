import React from "react";
import "../../global.css";
import { Stack } from "expo-router";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import Navbar from "../components/NavBar/navbar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Stack screenOptions={{ headerShown: false }} />
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
    </SafeAreaView>
    </GestureHandlerRootView>
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
