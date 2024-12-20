import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import Global from "../api/api";

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
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loader state

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchTrips = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`${Global.api}/scheduled-trips/`, {
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
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      };

      fetchTrips();
      return () => {
        isActive = false;
      };
    }, [depart, arrive, date])
  );

  return (
    <View className="flex-1 bg-gray-100 p-4 pb-0">
      <View className="bg-white p-4 rounded-lg shadow-md mb-4">
        <Text className="text-xl font-bold text-gray-800">Available Buses</Text>
        <Text className="text-gray-600">
          {depart} → {arrive} on {new Date(date as string).toLocaleDateString()}
        </Text>
      </View>

      {isLoading ? ( // Show loader while loading
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#E53E3E" />
          <Text className="text-gray-600 mt-2">Fetching buses...</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {trips.length > 0 ? (
            trips.map((trip) => (
              <View className="pb-5" key={trip.id}>
                <View className="bg-white p-4 rounded-lg shadow-md">
                  <Text className="text-lg font-semibold text-gray-800">
                    Bus: {trip.bus.bus_number}
                  </Text>
                  <Text className="text-gray-600">
                    {trip.depart.location} → {trip.destination.location}
                  </Text>
                  <Text className="text-gray-600">
                    Time: {new Date(trip.schedule).toLocaleTimeString()}
                  </Text>
                  <Text className="text-gray-600">
                    Fare: ₹{trip.fare} / Seat
                  </Text>
                  <View className="mt-2">
                    <Text className="text-gray-800 font-medium">
                      Type: {trip.bus.category.name}
                    </Text>
                    <Text className="text-gray-600">
                      {trip.bus.category.description}
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="mt-4 bg-red-600 rounded-lg py-2"
                    onPress={() => {
                      router.push({
                        pathname: "./booking/SeatSelection",
                        params: {
                          scheduleId: trip.id,
                          fare: trip.fare,
                        },
                      });
                      console.log("Booking trip:", trip.id);
                    }}
                  >
                    <Text className="text-white text-center font-bold">
                      Book Now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text className="text-gray-500 text-center mt-10">
              No buses available.
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}
