import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import SearchCard from "../components/homepage/searchcard";
import Header from "../components/NavBar/topbar";

const Home = () => {
  return (
    <View>
    <Header
        title="My Town Bus"
        onBackPress={() => console.log("Back pressed")}
        rightIcon={{ name: "notifications-outline", onPress: () => console.log("Notifications clicked") }}
      />
        <SearchCard/>
   </View>
  );
};
export default Home;
