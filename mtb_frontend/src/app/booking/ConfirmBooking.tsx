import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";
import { router,useLocalSearchParams } from "expo-router";
import Global from "../../api/api";
import BookingScreen from "../bookings";


const ConfirmBooking = () => {
  const { bookingId ,selectedSeats } = useLocalSearchParams();
  const [paymentReference, setPaymentReference] = useState("123456789");

  const confirmBooking = async () => {
    try { 
      const response = await axios.post(
        `${Global.api}/booking/${bookingId}/confirm/`,
        { 
          payment_reference: paymentReference,
          seat_numbers: selectedSeats,

        }
      );
      console.log("Booking confirmed:", response.data);
      Alert.alert("Ticket Booked Successfully !")
      router.push('../bookings')
    } catch (error) {
      console.error("Error confirming booking:", error);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-lg font-bold">Confirm Your Booking</Text>
      <Text>Booking ID: {bookingId}</Text>

      <TextInput
        placeholder="Enter Payment Reference"
        value={paymentReference}
        onChangeText={setPaymentReference}
        className="border p-2 rounded my-4"
      />

      <TouchableOpacity onPress={confirmBooking} className="bg-blue-500 p-4 rounded">
        <Text className="text-white text-center">Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmBooking;
