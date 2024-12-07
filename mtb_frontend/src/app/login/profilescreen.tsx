import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../../components/firebase/firebaseConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import Profile from "../profile";
import Global from "../../api/api";

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    const checkUserSession = async () => {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      const storedName = await AsyncStorage.getItem("userDisplayName");

      if (storedEmail && storedName) {
        setEmail(storedEmail);
        setName(storedName);
        setUserId(auth.currentUser?.uid || null);
      }

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserId(user.uid);
          fetchUserData(user.uid);
        } else {
          setUserId(null);
          setName("");
          setEmail("");
          setPhone("");
        }
      });
      return () => unsubscribe();
    };

    checkUserSession();
  }, []);
  

  const fetchUserData = async (uid: string) => {
    try {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      const storedName = await AsyncStorage.getItem("userDisplayName");
      if (storedEmail && storedName) {
        setEmail(storedEmail);
        setName(storedName);
      }
    } catch (error) {
      Alert.alert("Error", "Could not fetch user data.");
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert("Validation Error", "All fields are required!");
      return;
    }
    try {
      if (userId) {
        await AsyncStorage.setItem("userDisplayName", name);
        await AsyncStorage.setItem("userEmail", email);
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, { displayName: name });
        }
        Alert.alert("Success", "Your details have been updated!");
        setEditMode(false);
      } else {
        Alert.alert("Error", "User is not logged in.");
      }
    } catch (error) {
      Alert.alert("Error", "Could not save user data.");
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
        await AsyncStorage.multiRemove(["userName", "authToken"]);
        Global.token = (null);
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
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.profileContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={editMode ? styles.input : styles.inputDisabled}
          editable={editMode}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.profileContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={editMode ? styles.input : styles.inputDisabled}
          editable={editMode}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.profileContainer}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={editMode ? styles.input : styles.inputDisabled}
          editable={editMode}
          placeholder="Enter your phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      {editMode ? (
        <TouchableOpacity
          style={[
            styles.saveButton,
            (!name || !email || !phone) && styles.disabledButton,
          ]}
          onPress={handleSave}
          disabled={!name || !email || !phone}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={() => setEditMode(true)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  profileContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  inputDisabled: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    color: "#888",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
