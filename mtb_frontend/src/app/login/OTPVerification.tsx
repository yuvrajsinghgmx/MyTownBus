import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { ConfirmationResult } from "firebase/auth";

type OTPVerificationProps = {
  route: {
    params: {
      mobileNumber: string;
      confirmationResult: ConfirmationResult;
    };
  };
};

const OTPVerification: React.FC<OTPVerificationProps> = ({ route }) => {
  const { mobileNumber, confirmationResult } = route.params;
  const [otp, setOtp] = useState<string>("");

  const verifyOtp = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      alert(`Welcome, ${result.user.phoneNumber}!`);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
      />
      <Button title="Verify OTP" onPress={verifyOtp} />
    </View>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
});
