import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Global from '../../api/api';

interface Location {
  id: number;
  location: string;
}

interface Bus {
  id: number;
  bus_number: string;
}

interface Schedule {
  code:String;
  schedule: String;
  departLocation: number;
  destinationLocation: number;
  bus: number;
  fare: string;
}

export default function ScheduleManagement() {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [departLocation, setDepartLocation] = useState<number>(0);
  const [destinationLocation, setDestinationLocation] = useState<number>(0);
  const [bus, setBus] = useState<number>(0);
  const [fare, setFare] = useState<string>('');
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);

  useEffect(() => {
    fetchLocations();
    fetchBuses();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch(`${Global.api}/location/`);
      const data = await response.json();
      setLocations(data.locations);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch locations');
    }
  };

  const fetchBuses = async () => {
    try {
      const response = await fetch(`${Global.api}/bus/`);
      const data = await response.json();
      setBuses(data.bus);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch buses');
    }
  };

  const validateInputs = () => {
    if (!fromDate || !toDate || departLocation === 0 || destinationLocation === 0 || bus === 0 || !fare) {
      Alert.alert('Validation Error', 'Please fill all the fields before generating schedules.');
      return false;
    }

    if (fromDate > toDate) {
      Alert.alert('Validation Error', '`From Date` cannot be later than `To Date`.');
      return false;
    }

    if (departLocation === destinationLocation) {
      Alert.alert('Validation Error', 'Departure and destination locations cannot be the same.');
      return false;
    }

    return true;
  };

  const submitmySchedules = async () => {
    if (schedules.length === 0) {
      Alert.alert('Error', 'No schedules to submit.');
      return;
    }
  
    try {
      const response = await fetch(`${Global.api}/add-schedules/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schedules }),
      });
  
      if (response.ok) {
        Alert.alert('Success', 'All schedules have been submitted successfully');
        setSchedules([]);
        resetForm();
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        Alert.alert('Error', 'Failed to add schedules. Please check your inputs.');
      }
    } catch (error) {
      console.error('Error submitting schedules:', error);
      Alert.alert('Error', 'Failed to submit schedules.');
    }
  };
  

  const generateSchedules = () => {
    if (!validateInputs()) return;

    const dates = [];
    const current = new Date(fromDate!);
    const end = new Date(toDate!);

    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    const newSchedules = dates.map((date) => ({
      code: `${bus}${date.getDate()}${date.getMonth() + 1}`,
      schedule: date.toISOString(),
      departLocation,
      destinationLocation,
      bus,
      fare,
    }));

    setSchedules(newSchedules);
  };

  const submitSchedules = async () => {
    if (schedules.length === 0) {
      Alert.alert('Error', 'No schedules to submit.');
      return;
    }

    try {
      const response = await fetch(`${Global.api}/location/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ schedules }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Schedules added successfully');
        resetForm();
      } else {
        Alert.alert('Error', 'Failed to add schedules');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to submit schedules');
    }
  };

  const resetForm = () => {
    setSchedules([]);
    setFromDate(null);
    setToDate(null);
    setDepartLocation(0);
    setDestinationLocation(0);
    setBus(0);
    setFare('');
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Add Schedules</Text>

        <View className="mb-4">
          <Text className="mb-1">From Date</Text>
          <TouchableOpacity
            onPress={() => setShowFromDatePicker(true)}
            className="border border-gray-300 p-2 rounded"
          >
            <Text>{fromDate ? fromDate.toDateString() : 'Select From Date'}</Text>
          </TouchableOpacity>
          {showFromDatePicker && (
            <DateTimePicker
              value={fromDate || new Date()}
              mode="date"
              onChange={(event, date) => {
                setShowFromDatePicker(false);
                if (date) setFromDate(date);
              }}
            />
          )}
        </View>

        <View className="mb-4">
          <Text className="mb-1">To Date</Text>
          <TouchableOpacity
            onPress={() => setShowToDatePicker(true)}
            className="border border-gray-300 p-2 rounded"
          >
            <Text>{toDate ? toDate.toDateString() : 'Select To Date'}</Text>
          </TouchableOpacity>
          {showToDatePicker && (
            <DateTimePicker
              value={toDate || new Date()}
              mode="date"
              onChange={(event, date) => {
                setShowToDatePicker(false);
                if (date) setToDate(date);
              }}
            />
          )}
        </View>

        <View className="mb-4">
          <Text className="mb-1">Departure Location</Text>
          <Picker selectedValue={departLocation} onValueChange={setDepartLocation}>
            <Picker.Item label="Select Location" value={0} />
            {locations.map((location) => (
              <Picker.Item key={location.id} label={location.location} value={location.id} />
            ))}
          </Picker>
        </View>

        <View className="mb-4">
          <Text className="mb-1">Destination Location</Text>
          <Picker selectedValue={destinationLocation} onValueChange={setDestinationLocation}>
            <Picker.Item label="Select Location" value={0} />
            {locations.map((location) => (
              <Picker.Item key={location.id} label={location.location} value={location.id} />
            ))}
          </Picker>
        </View>

        <View className="mb-4">
          <Text className="mb-1">Bus</Text>
          <Picker selectedValue={bus} onValueChange={setBus}>
            <Picker.Item label="Select Bus" value={0} />
            {buses.map((bus) => (
              <Picker.Item key={bus.id} label={bus.bus_number} value={bus.id} />
            ))}
          </Picker>
        </View>

        <View className="mb-4">
          <Text className="mb-1">Fare</Text>
          <TextInput
            className="border border-gray-300 rounded p-2"
            value={fare}
            onChangeText={setFare}
            keyboardType="numeric"
            placeholder="Enter fare amount"
          />
        </View>

        <TouchableOpacity
          onPress={generateSchedules}
          className="bg-blue-500 p-4 rounded-lg mb-4"
        >
          <Text className="text-white font-semibold">Generate Schedules</Text>
        </TouchableOpacity>

        {schedules.length > 0 && (
          <View className="mb-4">
            <Text className="text-lg font-bold mb-2">Generated Schedules</Text>
            {schedules.map((schedule, index) => (
              <Text key={index} className="text-gray-700">
                {`Code: ${schedule.code} ,${schedule.schedule} - Bus: ${schedule.bus}, Route: ${schedule.departLocation} to ${schedule.destinationLocation}, Fare: ${schedule.fare}`}
              </Text>
            ))}
          </View>
        )}

        <TouchableOpacity
          onPress={submitmySchedules}
          className="bg-green-500 p-4 rounded-lg"
        >
          <Text className="text-white font-semibold">Submit All Schedules</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
