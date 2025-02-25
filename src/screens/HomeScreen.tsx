import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Header, BetSlip } from "../components";
import { gql, useQuery } from "@apollo/client";
import { BetsResponse } from "../types";

const GET_BETS = gql`
  query GetBets {
    bets {
      userBalance {
        cashBalance
        coinBalance
      }
      betSlip {
        game
        bet
        odds
      }
    }
  }
`;

function HomeScreen() {
  const { loading, error, data } = useQuery(GET_BETS);

  const [betsData, setBetsData] = useState<BetsResponse | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (data?.bets) {
      setBetsData(data.bets);
    }
  }, [data]);

  const handleOpenButtonPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#F02D95" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <Text style={styles.errorText}>Error fetching data</Text>
      </SafeAreaView>
    );
  }

  const betSlipCount = betsData?.betSlip?.length || 0;

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View
        style={{
          flex: 1,
          paddingBottom: insets.bottom || 16,
          marginHorizontal: 16,
        }}
      >
        {betSlipCount > 0 && (
          <TouchableOpacity
            style={styles.slipButton}
            onPress={() => handleOpenButtonPress()}
          >
            <Text style={styles.slipButtonText}>
              Open bet slip ({betSlipCount})
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {betsData && (
        <BetSlip
          ref={bottomSheetRef}
          data={betsData}
          setBetsData={setBetsData}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101114",
  },
  centeredContainer: {
    flex: 1,
    backgroundColor: "#101114",
    justifyContent: "center",
    alignItems: "center",
  },
  slipButton: {
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#FFE103",
    borderRadius: 8,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  slipButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#53470B",
  },
  errorText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
});

export default HomeScreen;
