import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Link } from "expo-router";
import axios from "axios";
import Global from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
interface Booking {
  name: string;
  schedule: number;
  seat_numbers: string[];
  status: "1" | "2";
  payment_reference: string | null;
  date_created: string;
}

interface TicketCardProps {
  booking: Booking;
}

const TicketCard = ({ booking }: TicketCardProps) => {
  return (
    <View style={styles.ticketCard}>
      <Text style={styles.ticketTitle}>{booking.name}</Text>
      <Text style={styles.ticketDetail}>Schedule ID: {booking.schedule}</Text>
      <Text style={styles.ticketDetail}>
        Seats: {booking.seat_numbers.join(", ")}
      </Text>
      <Text style={styles.ticketDetail}>
        Status: {booking.status === "1" ? "Pending" : "Paid"}
      </Text>
      <Text style={styles.ticketDetail}>
        Payment Reference: {booking.payment_reference || "N/A"}
      </Text>
      <Text style={styles.ticketDetail}>
        Date Created: {new Date(booking.date_created).toLocaleString()}
      </Text>
    </View>
  );
};

const BookingScreen = () => {
  const [bookingData, setBookingData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchBookingData = async () => {
        setLoading(true);
        setError(null);
        const storedToken = await AsyncStorage.getItem("authToken");
        if(storedToken){
          const userName = await AsyncStorage.getItem("userName");
        try {
          const response = await axios.get(`${Global.api}/bookings/?name=${userName}`);
          const data = response.data;
          if (data.bookings && data.bookings.length > 0) {
            setBookingData(data.bookings);
          } else {
            setBookingData([]);
          }
        } catch (error: any) {
          console.error("Error fetching booking data:", error);
          setError("Failed to fetch booking data. Please try again later.");
        } finally {
          setLoading(false);
        }
      }else{
        Alert.alert("Please Login to see your Bookings.");
        setLoading(false);
      }
      };

      fetchBookingData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#E74C3C" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <Link href={'./auth/Register'}>
          <Text style={styles.noBookingText}>Register</Text>
        </Link>
      </View>
    );
  }

  if (bookingData.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.mainContent}>
          {/* <Image
            // source={require("./no-bookings.png")}
            style={styles.placeholderImage}
          /> */}
          <Text style={styles.noBookingText}>No bookings available.</Text>
          {/* <Link href={'./auth/Register'}>
            <Text style={styles.noBookingText}>Register</Text>
          </Link>
          <Link href={'./auth/Login'}>
            <Text style={styles.noBookingText}>Login</Text>
          </Link>
          <Link href={'./owner/AddBus'}>
            <Text style={styles.noBookingText}>Add Bus</Text>
          </Link>
          <Link href={'./owner/DeleteBus'}>
            <Text style={styles.noBookingText}>Delete Bus</Text>
          </Link>
          <Link href={''}>
            <Text style={styles.noBookingText}>Book Bus</Text>
          </Link> */}
          <TouchableOpacity style={styles.bookNowButton}>
            <Text style={styles.bookNowText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text className="pl-10" style={styles.ticketTitle}>Your Bookings</Text>
      <View style={styles.mainContent}>
        {bookingData.map((booking, index) => (
          <TicketCard key={index} booking={booking} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  noBookingText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: "#FF0000",
    marginBottom: 16,
  },
  bookNowButton: {
    backgroundColor: "#E74C3C",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  bookNowText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  ticketCard: {
    width: "90%",
    backgroundColor: "#F9F9F9",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ticketDetail: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
});

export default BookingScreen;
