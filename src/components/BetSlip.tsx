import React, { useMemo, useState, forwardRef, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { BetsResponse, BetSlipItem } from "../types";
import BetTypeSelector from "./BetTypeSelector";
import BettingBalance from "./BettingBalance";
import BetContents from "./BetContents";

interface BetSlipProps {
  data: BetsResponse;
  setBetsData: (data: BetsResponse) => void;
}

const BetSlip = forwardRef(
  ({ data, setBetsData }: BetSlipProps, ref: React.Ref<BottomSheet>) => {
    const [selectedBetType, setSelectedBetType] = useState<
      "Singles" | "Parlay"
    >("Singles");
    const snapPoints = useMemo(() => ["85%"], []);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    const betSlipItems = data.betSlip;

    const handleDelete = (index?: number) => {
      if (index !== undefined) {
        const updatedBetSlip = data.betSlip.filter((_, i) => i !== index);
        setBetsData({ ...data, betSlip: updatedBetSlip });
      } else {
        setBetsData({ ...data, betSlip: [] });
      }
    };

    useEffect(() => {
      if (betSlipItems.length === 0) {
        const sheetRef = ref as React.MutableRefObject<BottomSheet | null>;
        sheetRef.current?.close();
      }
    }, [betSlipItems, ref]);

    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose={true}
        backgroundStyle={styles.container}
      >
        <BottomSheetView style={styles.viewContainer}>
          <Text style={styles.title}>Betslip ({betSlipItems.length})</Text>

          <BetTypeSelector
            selectedBetType={selectedBetType}
            onSelect={setSelectedBetType}
          />

          <BettingBalance
            isEnabled={isEnabled}
            toggleSwitch={toggleSwitch}
            userBalance={data.userBalance}
          />

          <BetContents
            mode={selectedBetType}
            items={betSlipItems}
            onDelete={handleDelete}
            isCash={isEnabled}
            toggleSwitch={toggleSwitch}
            bottomSheetRef={ref as React.RefObject<BottomSheet>}
          />
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1C1E22",
  },
  viewContainer: {
    flex: 1,
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default BetSlip;
