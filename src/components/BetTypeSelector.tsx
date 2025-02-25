import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BetType } from "../types";

interface BetTypeSelectorProps {
  selectedBetType: BetType;
  onSelect: (betType: BetType) => void;
}

const BetTypeSelector = ({
  selectedBetType,
  onSelect,
}: BetTypeSelectorProps) => {
  return (
    <View style={styles.betType}>
      <TouchableOpacity
        style={styles.tabWrapper}
        onPress={() => onSelect("Singles")}
      >
        <View
          style={[
            styles.tabContainer,
            selectedBetType === "Singles" && styles.selectedTab,
          ]}
        >
          <Text style={styles.tabTitle}>Singles</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabWrapper}
        onPress={() => onSelect("Parlay")}
      >
        <View
          style={[
            styles.tabContainer,
            selectedBetType === "Parlay" && styles.selectedTab,
          ]}
        >
          <Text style={styles.tabTitle}>Parlay</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  betType: {
    flexDirection: "row",
    marginTop: 24,
  },
  tabWrapper: {
    width: "50%",
  },
  tabContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: "white",
    width: "100%",
  },
  tabTitle: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});

export default BetTypeSelector;
