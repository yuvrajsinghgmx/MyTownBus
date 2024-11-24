import React, { useState } from "react";
import { Text, View, TextInput, Button, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import DateTimePicker from '@react-native-datetimepicker/datetimepicker';


export default function BusManagement() {
  const [busName, setBusName] = useState("");
  const [sleeperSeats, setSleeperSeats] = useState(0);
  const [semiSleeperSeats, setSemiSleeperSeats] = useState(0);
  const [generalSeats, setGeneralSeats] = useState(0);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [stops, setStops] = useState([""]);
  const [startDate, setStartDate] = useState("");
  const [busList, setBusList] = useState([
    { busName: "City Express", sleeper: 20, semiSleeper: 30, general: 50 },
  ]);

  const handleAddStop = () => {
    setStops([...stops, ""]);
  };

  const handleSaveBus = () => {
    const newBus = {
      busName,
      sleeper: sleeperSeats,
      semiSleeper: semiSleeperSeats,
      general: generalSeats,
      source,
      destination,
      stops,
      startDate,
    };
    setBusList([...busList, newBus]);
    setBusName("");
    setSleeperSeats(0);
    setSemiSleeperSeats(0);
    setGeneralSeats(0);
    setSource("");
    setDestination("");
    setStops([""]);
    setStartDate("");
  };

  return (
    <ScrollView className="bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-center mb-4">Bus Manager...</Text>
      
      {/* Bus Name */}
      <TextInput
        className="bg-white p-2 rounded-md mb-4"
        placeholder="Bus Name"
        value={busName}
        onChangeText={setBusName}
      />
      
      {/* Seat Types */}
      <View className="flex-row justify-between mb-4">
        <View className="w-1/3">
          <Text className="text-sm">Sleeper</Text>
          <TextInput
            className="bg-white p-2 rounded-md"
            keyboardType="numeric"
            placeholder="Seats"
            value={sleeperSeats.toString()}
            onChangeText={(value) => setSleeperSeats(parseInt(value))}
          />
        </View>
        <View className="w-1/3">
          <Text className="text-sm">Semi-Sleeper</Text>
          <TextInput
            className="bg-white p-2 rounded-md"
            keyboardType="numeric"
            placeholder="Seats"
            value={semiSleeperSeats.toString()}
            onChangeText={(value) => setSemiSleeperSeats(parseInt(value))}
          />
        </View>
        <View className="w-1/3">
          <Text className="text-sm">General</Text>
          <TextInput
            className="bg-white p-2 rounded-md"
            keyboardType="numeric"
            placeholder="Seats"
            value={generalSeats.toString()}
            onChangeText={(value) => setGeneralSeats(parseInt(value))}
          />
        </View>
      </View>

      {/* Source and Destination */}
      <View className="mb-4">
        <TextInput
          className="bg-white p-2 rounded-md mb-2"
          placeholder="Source"
          value={source}
          onChangeText={setSource}
        />
        <TextInput
          className="bg-white p-2 rounded-md"
          placeholder="Destination"
          value={destination}
          onChangeText={setDestination}
        />
      </View>

      {/* Stops */}
      <View className="mb-4">
        <Text className="font-semibold">Stops:</Text>
        {stops.map((stop, index) => (
          <TextInput
            key={index}
            className="bg-white p-2 rounded-md mb-2"
            placeholder={`Enter stop ${index + 1}`}
            value={stop}
            onChangeText={(text) => {
              const newStops = [...stops];
              newStops[index] = text;
              setStops(newStops);
            }}
          />
        ))}
        <Button title="+ Add Stop" onPress={handleAddStop} />
      </View>

      {/* Start Date */}
      <TextInput
        className="bg-white p-2 rounded-md mb-4"
        placeholder="Start Date"
        value={startDate}
        onChangeText={setStartDate}
      />

      {/* Add Bus Button */}
      <Button
        title="Add Bus"
        onPress={handleSaveBus}
        color="#FF7F32"
      />

      {/* Saved Buses List */}
      <View className="mt-6">
        <Text className="text-xl font-semibold mb-2">Available Buses</Text>
        {busList.map((bus, index) => (
          <View key={index} className="flex-row justify-between items-center bg-white p-4 mb-4 rounded-lg shadow-md">
            <View>
              <Text className="text-lg">{bus.busName}</Text>
              <Text>Sleeper: {bus.sleeper}</Text>
              <Text>Semi-Sleeper: {bus.semiSleeper}</Text>
              <Text>General: {bus.general}</Text>
            </View>
            <Button
              title="Delete"
              onPress={() => {
                const updatedBuses = busList.filter((_, i) => i !== index);
                setBusList(updatedBuses);
              }}
              color="red"
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
