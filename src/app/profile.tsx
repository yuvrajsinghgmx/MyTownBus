import React from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import CancelBooking from "../components/profile/CancelBooking";
import Contests from "../components/profile/contests";
import FAQs from "../components/profile/FAQ";
import NewsAndBlog from "../components/profile/NewsandBlog";
import Notifications from "../components/profile/Notifications";
import PrivacyPolicy from "../components/profile/PrivacyPolicy";
import ReferAFriend from "../components/profile/ReferAfriend";
import TermsAndConditions from "../components/profile/TermsandCondition";
import TravelGuidelines from "../components/profile/TravelGuidelines";
import WriteFeedback from "../components/profile/WriteFeedback";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
export default function Profile() {
  return (
    <SafeAreaView style={astyles.container}>
      {/* <StatusBar style="auto" /> */}
      
      <Text style={astyles.header}>Profile Page</Text>
      
      <ScrollView >
    <View  style={styles.container}>
      <Ionicons name="ticket" size={24} color="red" />
      <Text onPress={()=> router.push('/index')} style={styles.text}>Cancel Booking</Text>
    </View>
    <View style={styles.container}>
      <Ionicons name="trophy" size={24} color="#FF9800" />
      <Text style={styles.text}>Contests</Text>
    </View>
    <View style={styles.container}>
      <Ionicons name="help-outline" size={24} color="#00BCD4" />
      <Text style={styles.text}>FAQs</Text>
    </View>
    <View style={styles.container}>
      <Ionicons name="newspaper" size={24} color="#8BC34A" />
      <Text style={styles.text}>News & Blog</Text>
    </View>
    <View style={styles.container}>
      <Ionicons name="notifications" size={24} color="#FFC107" />
      <Text style={styles.text}>Notifications</Text>
    </View>
    <View style={styles.container}>
      <Ionicons name="key" size={24} color="#F44336" />
      <Text style={styles.text}>Privacy Policy</Text>
    </View>
    <View style={styles.container}>
      <Ionicons name="people" size={24} color="#FF5722" />
      <Text style={styles.text}>Refer A Friend</Text>
    </View>
    <View style={styles.container}>
      <Ionicons name="bulb" size={24} color="#009688" />
      <Text style={styles.text}>Terms & Conditions</Text>
    </View>
    <View style={styles.container}>
      <Ionicons name="hand-left" size={24} color="#03A9F4" />
      <Text style={styles.text}>Travel Guidelines</Text>
    </View>
    <View style={styles.container}>
      <Ionicons name="hammer" size={24} color="#673AB7" />
      <Text style={styles.text}>Write Feedback</Text>
    </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const astyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#EF5350",
    padding: 16,
    margin: 10,
    borderRadius: 10,
    color: "#FFF59D",
  },
});
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});