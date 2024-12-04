import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

import { Picker } from '@react-native-picker/picker';

const cities = [
  { label: "Ahmedabad", value: "ahmedabad" },
  { label: "Bangalore", value: "bangalore" },
  { label: "Chennai", value: "chennai" },
  { label: "Delhi", value: "delhi" },
  { label: "Hyderabad", value: "hyderabad" },
  { label: "Jaipur", value: "jaipur" },
  { label: "Kolkata", value: "kolkata" },
  { label: "Mumbai", value: "mumbai" },
  { label: "Pune", value: "pune" },
  { label: "Surat", value: "surat" },
];

interface Location {
  id: number;
  location: string;
}

interface Category {
  name: string;
  description: string;
}

interface Bus {
  id: number;
  bus_number: string;
  category: Category;
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
  const [api,setapi] = useState('');

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowPicker(false);
    if (selectedDate) setJourneyDate(selectedDate);
  };

  const handleSearch = async () => {
    try {
      const formattedDate = journeyDate.toISOString().split("T")[0];
      const response = await axios.get(`http://${api}/api/scheduled-trips/`, {
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
    <ScrollView>
    <View style={styles.container}>
      <View className="  border-b border-gray-300 py-2 mb-4 ">
        {/* <Ionicons name="location-outline" size={20} color="gray" className="mr-2 pr-0" /> */}
        <Picker
          placeholder="Departure"
          selectedValue={departureLocation}
          onValueChange={(itemValue) => setDepartureLocation(itemValue)}
          className="text-gray-600  p-20 "
        >
          <Picker.Item label="Select Departure" value="" enabled={false} />
          {cities.map((city) => (
            <Picker.Item key={city.value} label={city.label} value={city.value} />
          ))}
        </Picker>
      </View>

      {/* Arrival Location */}
      <View className="  border-b border-gray-300 py-2 mb-4">
        {/* <Ionicons name="location-sharp" size={20} color="gray" className="mr-2" /> */}
        <Picker
          placeholder="Destination"
          selectedValue={arrivalLocation}
          onValueChange={(itemValue) => setArrivalLocation(itemValue)}
          className="flex-1 text-gray-600"
        >
          <Picker.Item label="Select Destination" value="" enabled={false} />

          {cities.map((city) => (
            <Picker.Item key={city.value} label={city.label} value={city.value} />
          ))}
        </Picker>
      </View>
<TextInput
placeholder="Enter APi"
onChangeText={setapi}
>
  
</TextInput>


      <View  style={styles.dateContainer}>
      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateContent}>
        <Ionicons name="calendar-outline" size={20} color="gray" />
          {/* <Text style={styles.dateLabel}>Journey Date</Text> */}
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
                {trip.depart.location} to {trip.destination.location}
              </Text>
              <Text>Time: {new Date(trip.schedule).toLocaleString()}</Text>
              <Text>Fare: ₹{trip.fare} / Seat</Text>
              <Text>Bus Type - {trip.bus.category.name}</Text>
              <Text>{trip.bus.category.description}</Text>
            </View>
          ))
        ) : (
          <Text>No buses available.</Text>
        )}
      </View>
    </View>
    </ScrollView>
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
