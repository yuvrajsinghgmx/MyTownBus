import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import Checkbox from "../../components/Checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";

const API_BASE_URL = "http://192.168.1.75:8000/api";

const LoginSignupScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hasReferralCode, setHasReferralCode] = useState<boolean>(false);

  useEffect(() => {
    const checkSession = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        router.push("./profilescreen");
      }
    };
    checkSession();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login/`, { email, password });
      const { token } = response.data;

      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("userEmail", email);

      router.push("./profilescreen");
    } catch (error) {
      Alert.alert("Login Failed", "Invalid credentials. Please try again.");
      console.error(error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup/`, { email, password });
      const { token } = response.data;

      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("userEmail", email);

      router.push("./profilescreen");
    } catch (error) {
      Alert.alert("Signup Failed", "Unable to register. Please try again.");
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        await axios.post(
          `${API_BASE_URL}/logout/`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("userEmail");

      router.push("/login");
    } catch (error) {
      Alert.alert("Logout Failed", "Unable to log out. Please try again.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login / Sign Up</Text>
      <InputField
        label="Email"
        placeholder="Enter Your Email"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        label="Password*"
        placeholder="Enter Your Password"
        value={password}
        // secureTextEntry
        onChangeText={setPassword}
      />
      <Checkbox
        label="Have a referral code?"
        value={hasReferralCode}
        onValueChange={setHasReferralCode}
      />
      <CustomButton title="Login" onPress={handleLogin} />
      <CustomButton title="SignUp" onPress={handleSignup} />
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
