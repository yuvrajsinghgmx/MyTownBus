import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";

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

const SearchCard = () => {
  const [departureLocation, setDepartureLocation] = useState("");
  const [arrivalLocation, setArrivalLocation] = useState("");
  const [journeyDate, setJourneyDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [api, setApi] = useState("");

  const formattedDate = journeyDate.toISOString().split("T")[0];

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowPicker(false);
    if (selectedDate) setJourneyDate(selectedDate);
  };

  const handleSearch = () => {
    router.push({
      pathname: "/buses",
      params: {
        api,
        depart: departureLocation,
        arrive: arrivalLocation,
        date: formattedDate,
      },
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Departure Picker */}
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={departureLocation}
            onValueChange={(itemValue) => setDepartureLocation(itemValue)}
          >
            <Picker.Item label="Select Departure" value="" enabled={false} />
            {cities.map((city) => (
              <Picker.Item key={city.value} label={city.label} value={city.value} />
            ))}
          </Picker>
        </View>

        {/* Arrival Picker */}
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={arrivalLocation}
            onValueChange={(itemValue) => setArrivalLocation(itemValue)}
          >
            <Picker.Item label="Select Destination" value="" enabled={false} />
            {cities.map((city) => (
              <Picker.Item key={city.value} label={city.label} value={city.value} />
            ))}
          </Picker>
        </View>

        {/* API Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter API URL"
          onChangeText={setApi}
          value={api}
        />

        {/* Date Picker */}
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={20} color="gray" />
          <Text style={styles.date}>
            {journeyDate.toLocaleDateString("default", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <RNDateTimePicker
            mode="date"
            display="default"
            value={journeyDate}
            onChange={handleDateChange}
          />
        )}

        {/* Search Button */}
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search Buses</Text>
        </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 8,
  },
  date: {
    fontSize: 16,
    marginLeft: 10,
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
});
