import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

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

export default function Buses() {
  const { api, depart, arrive, date } = useLocalSearchParams();
  const [trips, setTrips] = useState<Trip[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const fetchTrips = async () => {
        try {
          const response = await axios.get(`http://192.168.1.75:8000/api/scheduled-trips/`, {
            params: {
              depart: depart,
              destination: arrive,
              date: date,
            },
          });
          if (isActive) {
            setTrips(response.data);
          }
        } catch (error) {
          console.error("Error fetching trips:", error);
        }
      };

      fetchTrips();
      return () => {
        isActive = false;
      };
    }, [depart, arrive, date])
  );

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  trip: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
});
