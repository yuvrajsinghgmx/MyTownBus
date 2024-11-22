import React from "react";
import { Text, View, StyleSheet, StatusBar ,Image} from "react-native";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import ProfileOption from "../components/ProfileOption";
export default function Profile() {
  return (
    <ScrollView  style={styles.container}    >
    <Link href={'./login/login'}>
    <View  style={styles.userInfoContainer}>
      <Image
        source={{
          uri: "https://via.placeholder.com/100",
        }}
        style={styles.profileImage}
      />
      
      <View style={styles.userDetails}>
        <Text   style={styles.userName}>Login to avail offers and more</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="gray" />
      </View>
    </View>
    </Link>
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
  </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop:0,
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
});