import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RNDateTimePicker from '@react-native-community/datetimepicker';

const SearchCard = () => {
  const [journeyDate, setJourneyDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event:any, selectedDate:any) => {
    setShowPicker(false);
    if (selectedDate) setJourneyDate(selectedDate);
  };

  return (
    <View style={styles.container}>

      {/* Leaving From Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="location-outline" size={20} color="gray" />
        <TextInput placeholder="Leaving From" style={styles.input} />
      </View>

      {/* Going To Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="location-sharp" size={20} color="gray" />
        <TextInput placeholder="Going To" style={styles.input} />
        <Ionicons name="swap-vertical-outline" size={20} color="gray" />
      </View>

      {/* Journey Date */}
      <View style={styles.dateContainer}>
        <Ionicons name="calendar-outline" size={20} color="gray" />
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateContent}>
          <Text style={styles.dateLabel}>Journey Date</Text>
          <View style={styles.dateRow}>
            <Text style={styles.date}>{journeyDate.toLocaleString('default', { month: 'short' }).toUpperCase()}</Text>
            <View style={styles.dateBox}>
              <Text style={styles.day}>{journeyDate.getDate()}</Text>
              <Text style={styles.weekday}>{journeyDate.toLocaleString('default', { weekday: 'short' })}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Show Date Picker */}
      {showPicker && (
        <RNDateTimePicker
          mode="date"
          display="default"
          value={journeyDate}
          onChange={handleDateChange}
        />
      )}

      {/* Search Button */}
      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search Buses</Text>
      </TouchableOpacity>
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
});
