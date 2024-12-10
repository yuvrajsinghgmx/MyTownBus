import React, { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";

interface Seat {
  id: number;
  seat_number: string;
  status: string;
}

const SeatSelection = () => {
  const { scheduleId } = useLocalSearchParams();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]); 

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        console.log(`${scheduleId}`);
        const response = await axios.get(
          `http://192.168.1.75:8000/seats/${scheduleId}/available`
        );
        setSeats(response.data);
      } catch (error) {
        console.error("Error fetching seats:", error);
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
    try {
      console.log(`${selectedSeats}`);
      const response = await axios.post(
        "http://192.168.1.75:8000/seats/book/",
        {
          seat_numbers: selectedSeats,
          schedule_id: scheduleId,
          name: "Yuvraj Singh",
        }
      );
      const bookingId = response.data.booking_id || response.data.booking_code;
      console.log("Booking successful:", response.data);
      router.push({
        pathname: "./ConfirmBooking",
        params: {
          bookingId: bookingId,
        },
      });
    } catch (error) {
      console.error("Error booking seats:", error);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-lg font-bold text-center mb-4">Select Your Seats</Text>
      <ScrollView contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}>
        {seats.map((seat) => (
          <TouchableOpacity
            key={seat.seat_number}
            className={`m-2 p-4 rounded-lg ${
              seat.status === "1"
                ? selectedSeats.includes(seat.seat_number) 
                  ? "bg-blue-600"
                  : "bg-green-600"
                : "bg-red-500"
            }`}
            disabled={seat.status !== "1"}
            onPress={() => toggleSeatSelection(seat.seat_number)}
          >
            <Text>💺</Text>
            <Text className="text-white font-bold">
              {seat.seat_number}{" "}
              {seat.status === "1" ? "🟩" : seat.status === "2" ? "🟦" : "🟥"}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        className="bg-green-600 p-4 rounded-lg mt-4"
        onPress={bookSeats}
      >
        <Text className="text-center text-white font-bold">
          Book {selectedSeats.length} Seats
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SeatSelection;
