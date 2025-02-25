import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { UserBalance } from "../types";

interface BettingBalanceProps {
  isEnabled: boolean;
  toggleSwitch: () => void;
  userBalance: UserBalance;
}

const BettingBalance = ({
  isEnabled,
  toggleSwitch,
  userBalance,
}: BettingBalanceProps) => {
  return (
    <LinearGradient
      colors={isEnabled ? ["#006400", "#1B1F23"] : ["#46213A", "#1B1F23"]}
      style={styles.balanceOption}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
      <View style={styles.balanceContent}>
        <Ionicons name="diamond-outline" color="white" size={20} />
        <Text style={styles.balanceText}>
          {isEnabled
            ? userBalance.cashBalance.toString()
            : userBalance.coinBalance.toString()}
        </Text>
      </View>

      <Switch
        trackColor={{ false: "#F02D95", true: "#19C54B" }}
        thumbColor="white"
        ios_backgroundColor="#F02D95"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  balanceOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  balanceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 4,
  },
  balanceContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default BettingBalance;
