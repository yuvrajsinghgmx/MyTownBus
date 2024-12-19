import React, { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import Global from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface Seat {
  id: number;
  seat_number: string;
  status: string;
}

const SeatSelection = () => {
  const { scheduleId, fare } = useLocalSearchParams();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loader state
  let numericFare = +fare;

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        setIsLoading(true); // Start loader
        console.log(`${scheduleId}`);
        const response = await axios.get(
          `${Global.api}/seats/${scheduleId}/available`
        );
        setSeats(response.data);
      } catch (error) {
        console.error("Error fetching seats:", error);
      } finally {
        setIsLoading(false); // Stop loader
      }
    };
    fetchSeats();
  }, [scheduleId]);

  const toggleSeatSelection = (seatNumber: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((number) => number !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const bookSeats = async () => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      console.log(token)
    const name = await AsyncStorage.getItem("userName");
    try {
      console.log(`${selectedSeats}`);
      const response = await axios.post(
        `${Global.api}/seats/book/`,
        {
          seat_numbers: selectedSeats,
          schedule_id: scheduleId,
          name: name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      const bookingId = response.data.booking_id || response.data.booking_code;
      console.log("Booking successful:", response.data);
      router.push({
        pathname: "./ConfirmBooking",
        params: {
          bookingId: bookingId,
          selectedSeats: selectedSeats,
        },
      });
    } catch (error) {
      console.error("Error booking seats:", error);
    }
  }else{
    Alert.alert("Please Login to Book Seats!")
  }
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {isLoading ? ( // Show loader while fetching seats
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#E53E3E" />
          <Text className="text-gray-600 mt-2">Loading seats...</Text>
        </View>
      ) : (
        <>
          <Text className="text-lg font-bold text-center mb-4">Select Your Seats</Text>
          <ScrollView contentContainerStyle={{ padding: 10 }}>
  <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
    {seats.map((seat) => (
      <TouchableOpacity
        key={seat.seat_number}
        style={{
          width: "22%",
          aspectRatio: 1,
          marginBottom: 10,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          backgroundColor:
            seat.status === "1"
              ? selectedSeats.includes(seat.seat_number)
                ? "#2563EB" 
                : "#16A34A"
              : "#DC2626",
        }}
        disabled={seat.status !== "1"}
        onPress={() => toggleSeatSelection(seat.seat_number)}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
        💺  {seat.seat_number}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
</ScrollView>


          <TouchableOpacity
            className="bg-green-600 p-4 rounded-lg mt-4"
            onPress={bookSeats}
          >
            <Text className="text-center text-white font-bold">
              Book {selectedSeats.length} Seats
            </Text>
          </TouchableOpacity>
          <Text>Total Amount: {selectedSeats.length * numericFare}</Text>
        </>
      )}
    </View>
  );
};

export default SeatSelection;
