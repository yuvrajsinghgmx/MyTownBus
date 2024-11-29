import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import InputField from "./InputField";
import CustomButton from "./CustomButton";
import Checkbox from "./Checkbox";
import GoogleSignInButton from "./GoogleSignInButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  OTPVerification: { mobileNumber: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "OTPVerification">;

const LoginSignupScreen: React.FC<Props> = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [hasReferralCode, setHasReferralCode] = useState<boolean>(false);

  const handleLoginSignup = () => {
    if (mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    navigation.navigate("OTPVerification", { mobileNumber });
  };

  const handleGoogleSignIn = () => {
    alert("Google Sign-In is not yet implemented!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login / Sign Up</Text>
      <InputField
        label="Mobile Number*"
        placeholder="Enter Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="phone-pad"
      />
      <Checkbox
        label="Have a referral code?"
        value={hasReferralCode}
        onValueChange={setHasReferralCode}
      />
      <CustomButton title="Login/Sign Up with OTP" onPress={handleLoginSignup} />
      <Text style={styles.orText}>or login with</Text>
      <GoogleSignInButton onPress={handleGoogleSignIn} />
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
