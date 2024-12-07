import React, { useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView, Alert, Modal, TextInput, Button, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import ProfileOption from "../components/ProfileOption";
import { auth } from "../components/firebase/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Global from "../api/api";

export default function Profile() {
  const token = AsyncStorage.getItem("authToken")
  const [isModalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const name = auth.currentUser?.displayName ?? "Login to avail offers and more";

  const handlePasswordSubmit = () => {
    if (password === "owner_password") {
      setModalVisible(false);
      router.push("./booking/BusManagement");
    } else {
      Alert.alert("Authentication Failed", "Invalid password.");
    }
    setPassword("");
  };
  return (
    
    <ScrollView style={styles.container}>
      <TouchableOpacity  onPress={()=>{ if (Global.token) {
        router.push("./login/profilescreen")
      } else {
        router.push("./login/login")
      }} } >

        <View style={styles.userInfoContainer}>
          <Image
            source={{
              uri: auth.currentUser?.photoURL ?? "https://via.placeholder.com/100",
            }}
            style={styles.profileImage}
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{name}</Text>
            <Ionicons name="chevron-forward-outline" size={24} color="gray" />
          </View>
        </View>
        </TouchableOpacity>

      {/* Profile options */}
      <ProfileOption
        icon="close-circle-outline"
        title="Cancel Booking"
        onPress={() => console.log("Cancel Booking pressed")}
      />
      <ProfileOption
        icon="gift-outline"
        title="Refer A Friend"
        onPress={() => console.log("Refer A Friend pressed")}
      />
          <ProfileOption
        icon="gift-outline"
        title="Refer A Friend"
        onPress={() => console.log("Refer A Friend pressed")}
      />
      <ProfileOption
        icon="notifications-outline"
        title="Notifications"
        badgeCount={2}
        onPress={() => console.log("Notifications pressed")}
      />
      <ProfileOption
        icon="document-text-outline"
        title="Travel Guidelines"
        onPress={() => console.log("Travel Guidelines pressed")}
      />
      <ProfileOption
        icon="newspaper-outline"
        title="News & Blog"
        onPress={() => console.log("News & Blog pressed")}
      />
      <ProfileOption
        icon="trophy-outline"
        title="Contests"
        onPress={() => console.log("Contests pressed")}
      />
      <ProfileOption
        icon="chatbubble-outline"
        title="Write Feedback"
        onPress={() => console.log("Write Feedback pressed")}
      />
      <ProfileOption
        icon="help-circle-outline"
        title="FAQs"
        onPress={() => console.log("FAQs pressed")}
      />
      <ProfileOption
        icon="document-text-outline"
        title="Terms & Conditions"
        onPress={() => console.log("Terms & Conditions pressed")}
      />
      <ProfileOption
        icon="lock-closed-outline"
        title="Privacy Policy"
        onPress={() => console.log("Privacy Policy pressed")}
      />
      <ProfileOption
        icon="person-outline"
        title="Buses"
        onPress={() => setModalVisible(true)}
      />

      {/* Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Authentication</Text>
            <Text style={styles.modalText}>Enter your password to access bus management:</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Submit" onPress={handlePasswordSubmit} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  userName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
