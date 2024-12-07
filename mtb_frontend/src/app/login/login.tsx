import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, Alert } from "react-native";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import Checkbox from "../../components/Checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import Global from "../../api/api";

const API_BASE_URL = "http://192.168.1.75:8000/api";

const LoginSignupScreen: React.FC = () => {
  const [name, setName] = useState("My Town Bus");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasReferralCode, setHasReferralCode] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${Global.api}/login/`, {
        username,
        password,
        name,
      });
      const { token } = response.data;

      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("userName", username);

      router.push("./profilescreen");
    } catch (error) {
      Alert.alert("Login Failed", "Invalid credentials. Please try again.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <InputField
        label="Username"
        placeholder="Enter Your UserName"
        value={username}
        onChangeText={setUsername}
      />
      <InputField
        label="Password*"
        placeholder="Enter Your Password"
        value={password}
        keyboardType="visible-password"
        onChangeText={setPassword}
      />
      <Checkbox
        label="Have a referral code?"
        value={hasReferralCode}
        onValueChange={setHasReferralCode}
      />
      <CustomButton title="Login" onPress={handleLogin} />
      <CustomButton title="SignUp" onPress={() => router.push("./signup")} />
      <Text style={styles.footerText}>
        By Logging in, you agree to our{" "}
        <Text style={styles.linkText}>T&C</Text> and{" "}
        <Text style={styles.linkText}>Privacy Policy</Text>
      </Text>
    </View>
  );
};

export default LoginSignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  footerText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 12,
    color: "#999",
  },
  linkText: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});
