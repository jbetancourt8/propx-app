import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sports</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="notifications-outline" color="white" size={24} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="wallet-outline" color="white" size={24} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="person-circle-outline" color="white" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textTransform: "uppercase",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "#282A2D",
    padding: 12,
    margin: 2,
    borderRadius: 8,
  },
});

export default Header;
