import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
export default function search(){
    return (
        <View style={styles.container}>
          <Text className="font-bold text-2xl bg-red-500 p-10 m-5 border border-5xl-amber-900 rounded-2xl color-lime-200">Help Page</Text>
          <StatusBar style="auto" />
        </View>
      );
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
});