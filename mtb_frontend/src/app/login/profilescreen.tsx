import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("MyTownBus");
  const [phone, setPhone] = useState<string>("12345678");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [age, setAge] = useState<string>("00");

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
          if (!token) {
            Alert.alert("Not logged in", "Please log in to access this page.");
            router.replace("./login");
            return;
          }

          const response = await fetch("http://192.168.1.75:8000/api/profile/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setName(data.name || "");
            setEmail(data.username || "");
            setPhone(data.phone || "");
            setAge(data.age || "00");
          } else {
            Alert.alert("Error", "Failed to fetch user data.");
          }
        } catch (error) {
          Alert.alert("Error", "Could not fetch user data.");
          console.error("Fetch error:", error);
        }
      };

      fetchUserData();
    }, [router])
  );

  const handleSave = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert("Validation Error", "Name and phone fields are required!");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        Alert.alert("Error", "User is not logged in.");
        return;
      }

      const response = await fetch("http://192.168.1.75:8000/api/profile/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ name, phone }),
      });

      if (response.ok) {
        Alert.alert("Success", "Your details have been updated!");
        setEditMode(false);
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Failed to update details.");
      }
    } catch (error) {
      Alert.alert("Error", "Could not save user data.");
      console.error("Save error:", error);
    }
  };

  const toggleEditMode = () => {
    if (editMode) {
      handleSave();
    } else {
      setEditMode(true);
    }
  };

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await fetch("http://192.168.1.75:8000/api/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        await AsyncStorage.multiRemove(["authToken"]);
        Alert.alert("Logged out", "You have been successfully logged out.");
        router.replace("./login");
      } else {
        const errorData = await response.json();
        Alert.alert("Logout Failed", errorData.message || "Unable to log out.");
      }
    } catch (error) {
      Alert.alert("Error", "Could not log out. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={true}
        className="p-4"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-bold text-gray-800">My Account</Text>
          <TouchableOpacity
            onPress={toggleEditMode}
            className="bg-red-500 px-4 py-2 rounded-full"
          >
            <Text className="text-white font-semibold">
              {editMode ? "Save" : "Edit"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile Information */}
        <View className="mt-6 bg-gray-100 p-4 rounded-lg shadow-sm">
          {/* Full Name */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium">Full Name</Text>
            <TextInput
              className={`${
                editMode
                  ? "border border-gray-400"
                  : "border border-transparent"
              } mt-1 p-2 rounded-lg bg-white`}
              editable={editMode}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Birth Date (Static) */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium">Birth Date</Text>
            <TextInput
              className="mt-1 p-2 rounded-lg bg-gray-200 text-gray-600 border border-transparent"
              editable={false}
              placeholder="Select birth date"
              value="Not Available"
            />
          </View>

          {/* Gender (Static Options) */}
          <View className="mb-4 ">
            <Text className="text-gray-700 font-medium">Gender</Text>
            <View className="flex-row mt-2  space-x-4">
              <TouchableOpacity className="flex-1 bg-gray-200 p-2 m-2 rounded-lg items-center">
                <Text className="text-gray-600">Male</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-gray-200 p-2 m-2 rounded-lg items-center">
                <Text className="text-gray-600">Female</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Phone */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium">Mobile</Text>
            <TextInput
              className={`${
                editMode
                  ? "border border-gray-400"
                  : "border border-transparent"
              } mt-1 p-2 rounded-lg bg-white`}
              editable={editMode}
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Email (Static) */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium">User Name</Text>
            <TextInput
              className="mt-1 p-2 rounded-lg bg-gray-200 text-gray-600 border border-transparent"
              editable={false}
              value={email}
            />
          </View>

          {/* Age */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium">Age</Text>
            <TextInput
              className="mt-1 p-2 rounded-lg bg-gray-200 text-gray-600 border border-transparent"
              editable={false}
              value={age}
            />
          </View>
        </View>

        {/* Other Options */}
        <View className="mt-6">
          {[
            { title: "Traveller Details" },
            { title: "Saved Cards" },
            { title: "Billing Address" },
            { title: "UPI Payment/Instant Refund" },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center justify-between p-4 bg-gray-50 border-b border-gray-200"
            >
              <Text className="text-gray-700">{item.title}</Text>
              <Text className="text-gray-400">{">"}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out */}
        <TouchableOpacity
          className="bg-red-500 mt-6 py-3 rounded-lg"
          onPress={handleLogout}
        >
          <Text className="text-center text-white font-semibold">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
