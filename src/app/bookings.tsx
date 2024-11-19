import { Text } from "react-native";
import { StatusBar} from "expo-status-bar";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import BookingScreen from "../components/booking/bookingscreen";

export default function App() {
    return (
      BookingScreen()
    );
  }
