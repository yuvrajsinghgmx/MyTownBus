import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert ,ScrollView } from "react-native";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import Checkbox from "../../components/Checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";

const API_BASE_URL = "http://10.21.121.59:8000/api";

const LoginSignupScreen: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
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
      const response = await axios.post(`${API_BASE_URL}/login/`, { username, password,name });
      const { token } = response.data;

      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("userName", username);
      Alert.alert("User Created SucessFully")
      router.push("./profilescreen");
    } catch (error) {
      Alert.alert("Login Failed", "Invalid credentials. Please try again.");
      console.error(error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup/`, { username, password ,name,age,gender,phone,address});
      // const { token } = response.data;

      // await AsyncStorage.setItem("authToken", token);
      // await AsyncStorage.setItem("userName", username);
      handleLogin();

      // router.push("./profilescreen");
    } catch (error) {
      Alert.alert("Signup Failed", "Unable to register. Please try again.");
      console.error(error);
    }
  };


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Login / Sign Up</Text>
      <InputField
        label="Name"
        placeholder="Enter Your Name"
        value={name}
        onChangeText={setName}
      />
      <InputField
        label="UserName"
        placeholder="Enter Your Username"
        value={username}
        onChangeText={setUsername}
      />
      <InputField
        label="Password*"
        placeholder="Enter Your Password"
        value={password}
        onChangeText={setPassword}
      />
      <InputField
        label="Age"
        placeholder="Enter Your Age"
        value={age}
        onChangeText={setAge}
      />
      <InputField
        label="Gender"
        placeholder="Enter Your Gender"
        value={gender}
        onChangeText={setGender}
      />
      <InputField
        label="Phone"
        placeholder="Enter Your Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <InputField
        label="Address"
        placeholder="Enter Your Address"
        value={address}
        onChangeText={setAddress}
      />
      <Checkbox
        label="Have a referral code?"
        value={hasReferralCode}
        onValueChange={setHasReferralCode}
      />
      <CustomButton title="SignUp" onPress={handleSignup} />
      <Text style={styles.footerText}>
        By Logging in, you agree to our{" "}
        <Text style={styles.linkText}>T&C</Text> and{" "}
        <Text style={styles.linkText}>Privacy Policy</Text>
      </Text>
    </ScrollView>
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
