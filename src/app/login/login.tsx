import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import Checkbox from "../../components/Checkbox";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut,} from "firebase/auth";
import { auth } from "../../components/firebase/firebaseConfig";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  OTPVerification: { mobileNumber: string; confirmationResult: any };
};

type Props = NativeStackScreenProps<RootStackParamList, "OTPVerification">;

const LoginSignupScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hasReferralCode, setHasReferralCode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>();

  useEffect(() => {
    const checkSession = async () => {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      const storedDisplayName = await AsyncStorage.getItem("userDisplayName");
      if (storedEmail && storedDisplayName) {
        router.push("./profilescreen");
      }
    };

    checkSession();
  }, []);

  const handleLoginSignup = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      if (auth.currentUser) {
        await AsyncStorage.setItem("userEmail", auth.currentUser.email ?? "");
        await AsyncStorage.setItem("userDisplayName", auth.currentUser.displayName ?? "");
      }
      router.push("./profilescreen");
    } catch (error) {
      console.log(error);
    } finally {
      setResponse(response);
    }
  };

  const Signup = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: "User Name",
        });
        await AsyncStorage.setItem("userEmail", auth.currentUser.email ?? "");
        await AsyncStorage.setItem("userDisplayName", auth.currentUser.displayName ?? "");
      }

      router.push("./profilescreen");
    } catch (error) {
      console.log(error);
    } finally {
      setResponse(response);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userEmail");
      await AsyncStorage.removeItem("userDisplayName");
      router.push("/login");
    } catch (error) {
      console.log("Logout failed:", error);
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
        onChangeText={setPassword}
      />
      <Checkbox
        label="Have a referral code?"
        value={hasReferralCode}
        onValueChange={setHasReferralCode}
      />
      <CustomButton title="Login" onPress={handleLoginSignup} />
      <CustomButton title="SignUp" onPress={Signup} />
      {/* <CustomButton title="Logout" onPress={handleLogout} /> Add a logout button */}
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
  orText: {
    marginVertical: 10,
    textAlign: "center",
    color: "#999",
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
