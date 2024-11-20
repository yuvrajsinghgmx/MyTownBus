import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import Icon from "react-native-vector-icons/MaterialIcons";


const BookingScreen = () => {
  const [selectedTab, setSelectedTab] = useState("Bus");


  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      {/* <View style={styles.topBar}>
        <Text style={styles.title}>Bookings</Text>
      </View> */}

      {/* Tab Row */}
      {/* <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.selectedTab,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.selectedTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View> */}

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Image
          source={require("./no-bookings.png")} // Replace with your icon path
          style={styles.placeholderImage}
        />
        <Text style={styles.noBookingText}>You have no bookings yet</Text>
        <TouchableOpacity style={styles.bookNowButton}>
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNav}>
        {bottomTabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.navItem}
            onPress={() => console.log(`${tab.name} clicked`)}
          >
            <Icon
              name={tab.icon}
              size={24}
              color={tab.name === "Bookings" ? "#E74C3C" : "#000"}
            />
            <Text
              style={[
                styles.navText,
                tab.name === "Bookings" && styles.selectedNavText,
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))} */}
      {/* </View> */}
    </SafeAreaView>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topBar: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#FFF4F4",
    justifyContent: "space-around",
    paddingVertical: 8,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  selectedTab: {
    backgroundColor: "#E74C3C",
  },
  tabText: {
    fontSize: 14,
    color: "#000",
  },
  selectedTabText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  noBookingText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 16,
  },
  bookNowButton: {
    backgroundColor: "#E74C3C",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  bookNowText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    height: 60,
    alignItems: "center",
    justifyContent: "space-around",
  },
  navItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#000",
  },
  selectedNavText: {
    color: "#E74C3C",
    fontWeight: "bold",
  },
});
