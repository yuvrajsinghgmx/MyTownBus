import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import Checkbox from "../../components/Checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import Global from "../../api/api";
import * as Keychain from 'react-native-keychain';



const API_BASE_URL = "http://192.168.1.75:8000/api";


const LoginSignupScreen: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hasReferralCode, setHasReferralCode] = useState<boolean>(false);

  // useEffect(() => {
  //   const checkSession = async () => {
  //     const token = await AsyncStorage.getItem("authToken");
  //     if (token) {
  //       console.log(`${token}`)
  //       router.push("./profilescreen");
  //     }
  //   };
  //   checkSession();
  // }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login/`, { username, password ,name });
      const { token } = response.data;

      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("userName", username);
      Global.token=token; 
    
      // saveToken(username,token);
      router.push("./profilescreen");
    } catch (error) {
      Alert.alert("Login Failed", "Invalid credentials. Please try again.");
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
  const token =  AsyncStorage.getItem("authToken");
  return (
    <View style={styles.container}>
      <InputField
        label="Name"
        placeholder="Enter Your Name"
        value={name}
        onChangeText={setName}
      />
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
        // secureTextEntry
        onChangeText={setPassword}
      />
      <Checkbox
        label="Have a referral code?"
        value={hasReferralCode}
        onValueChange={setHasReferralCode}
      />
      <CustomButton title="Login" onPress={handleLogin} />
      <CustomButton title="SignUp" onPress={()=> router.push('./signup')} />
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
