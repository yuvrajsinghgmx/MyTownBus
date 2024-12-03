import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

import {Picker} from '@react-native-picker/picker';

interface Location {
  id: number;
  name: string;
}

interface Bus {
  id: number;
  bus_number: string;
}

interface Trip {
  id: number;
  bus: Bus;
  depart: Location;
  destination: Location;
  schedule: string;
  fare: number;
}

const SearchCard = () => {
  const [departureLocation, setDepartureLocation] = useState("");
  const [arrivalLocation, setArrivalLocation] = useState("");
  const [journeyDate, setJourneyDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowPicker(false);
    if (selectedDate) setJourneyDate(selectedDate);
  };

  const handleSearch = async () => {
    try {
      const formattedDate = journeyDate.toISOString().split("T")[0];
      const response = await axios.get("http://10.21.122.188:8000/api/scheduled-trips/", {
        params: {
          depart: departureLocation,
          destination: arrivalLocation,
          date: formattedDate,
        },
      });

      setTrips(response.data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Departure Location Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={20} color="gray" />
        <TextInput
          placeholder="Leaving From"
          value={departureLocation}
          onChangeText={setDepartureLocation}
          style={styles.input}
        />
      </View>

      {/* Arrival Location Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="location-sharp" size={20} color="gray" />
        <TextInput
          placeholder="Going To"
          value={arrivalLocation}
          onChangeText={setArrivalLocation}
          style={styles.input}
        />
      </View>

      {/* Journey Date Picker */}
      <View style={styles.dateContainer}>
        <Ionicons name="calendar-outline" size={20} color="gray" />
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateContent}>
          <Text style={styles.dateLabel}>Journey Date</Text>
          <View style={styles.dateRow}>
            <Text style={styles.date}>
              {journeyDate.toLocaleString("default", { month: "short" }).toUpperCase()}
            </Text>
            <View style={styles.dateBox}>
              <Text style={styles.day}>{journeyDate.getDate()}</Text>
              <Text style={styles.weekday}>
                {journeyDate.toLocaleString("default", { weekday: "short" })}
              </Text>
            </View>
          </View>



          
        </TouchableOpacity>
      </View>



      {showPicker && (
        <RNDateTimePicker mode="date" display="default" value={journeyDate} onChange={handleDateChange} />
      )}
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search Buses</Text>
      </TouchableOpacity>
      <View>
        {trips.length > 0 ? (
          trips.map((trip) => (
            <View key={trip.id} style={styles.trip}>
              <Text>Bus: {trip.bus.bus_number}</Text>
              <Text>
                {trip.depart.name} to {trip.destination.name}
              </Text>
              <Text>Time: {new Date(trip.schedule).toLocaleString()}</Text>
              <Text>Fare: ₹{trip.fare}</Text>
            </View>
          ))
        ) : (
          <Text>No trips found.</Text>
        )}
      </View>
    </View>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    margin: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 8,
  },
  dateContent: {
    marginLeft: 8,
    flex: 1,
  },
  dateLabel: {
    fontSize: 14,
    color: "gray",
    marginBottom: 4,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 14,
    color: "#333",
    marginRight: 12,
  },
  dateBox: {
    backgroundColor: "#f3f3f3",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  day: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d32f2f",
    textAlign: "center",
  },
  weekday: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
  searchButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  trip: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
});
