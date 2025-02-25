import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from "react-native";
import { BetSlipItem } from "../types";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet from "@gorhom/bottom-sheet";

interface BetCardsProps {
  mode: "Singles" | "Parlay";
  items: BetSlipItem[];
  onDelete: (index?: number) => void;
  isCash: boolean;
  toggleSwitch: () => void;
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const BetContents = ({
  mode,
  items,
  onDelete,
  isCash,
  toggleSwitch,
  bottomSheetRef,
}: BetCardsProps) => {
  const [cardValues, setCardValues] = useState<string[]>(
    mode === "Singles" ? items.map(() => "0") : []
  );
  const [parlayValue, setParlayValue] = useState<string>("");

  const firstInputRef = useRef<TextInput>(null);

  const presets = isCash ? [50, 100, 200] : [25000, 50000, 100000];

  const [confirmStatus, setConfirmStatus] = useState<
    "default" | "confirming" | "confirmed"
  >("default");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (mode === "Singles") {
      setCardValues(items.map(() => "0"));
    } else {
      setParlayValue("0");
    }
  }, [items, mode]);

  const filterInput = (text: string) => text.replace(/[^0-9]/g, "");

  let totalBet = 0;
  let inputsValid = false;
  if (mode === "Singles") {
    totalBet = cardValues.reduce((acc, val) => acc + (parseInt(val) || 0), 0);
    inputsValid = cardValues.every((val) => (parseInt(val) || 0) > 0);
  } else {
    totalBet = parseInt(parlayValue) || 0;
    inputsValid = totalBet > 0;
  }
  const potentialWin = totalBet * 1.5;

  const dismissKeyboard = () => Keyboard.dismiss();

  const renderCards = () => {
    if (mode === "Singles") {
      return items.map((item, index) => (
        <View key={index} style={styles.cardRow}>
          <TouchableOpacity
            onPress={() => onDelete(index)}
            style={styles.deleteButton}
          >
            <Ionicons name="trash" color="white" size={24} />
          </TouchableOpacity>

          <View style={styles.cardContent}>
            <Text style={styles.cardText}>{item.game}</Text>
            <Text style={styles.cardText}>{item.bet}</Text>
            <Text style={styles.cardText}>{item.odds}</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={cardValues[index]}
              onChangeText={(text) => {
                const numericText = filterInput(text);
                const newValues = [...cardValues];
                newValues[index] = numericText;
                setCardValues(newValues);
              }}
              ref={index === 0 ? firstInputRef : undefined}
              onSubmitEditing={Keyboard.dismiss}
              onBlur={Keyboard.dismiss}
            />
          </View>
        </View>
      ));
    } else {
      return (
        <View style={styles.cardRow}>
          <TouchableOpacity
            onPress={() => onDelete()}
            style={styles.deleteButton}
          >
            <Ionicons name="trash" color="white" size={24} />
          </TouchableOpacity>
          <View style={styles.cardContent}>
            {items.map((item, idx) => (
              <View key={idx} style={styles.parlayItem}>
                <Text style={styles.cardText}>{item.game}</Text>
                <Text style={styles.cardText}>{item.bet}</Text>
                <Text style={styles.cardText}>{item.odds}</Text>
              </View>
            ))}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={parlayValue}
              onChangeText={(text) => setParlayValue(filterInput(text))}
              ref={firstInputRef}
              onBlur={Keyboard.dismiss}
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
        </View>
      );
    }
  };

  const renderPresets = () => (
    <View style={styles.presetContainer}>
      {presets.map((amount) => (
        <TouchableOpacity
          key={amount}
          onPress={() => {
            if (mode === "Singles" && items.length > 0) {
              const perCard = (amount / items.length).toFixed(0);
              setCardValues(items.map(() => perCard));
            } else if (mode === "Parlay") {
              setParlayValue(amount.toString());
            }
          }}
          style={styles.presetButton}
        >
          <Text style={styles.presetButtonText}>
            {isCash ? `$${amount}` : `${amount / 1000}k`}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => firstInputRef.current?.focus()}
        style={styles.presetButton}
      >
        <Text style={styles.presetButtonText}>Custom</Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    if (confirmStatus === "confirmed" && copied) {
      onDelete();
      if (bottomSheetRef.current) {
        bottomSheetRef.current.close();
      }
      Alert.alert("Success", "Both bets were successfully completed.");
    }
  }, [confirmStatus, copied]);

  const handleConfirmPress = () => {
    if (confirmStatus === "default") {
      setConfirmStatus("confirming");
      setTimeout(() => {
        setConfirmStatus("confirmed");
      }, 3000);
    }
  };

  const copyButtonColor = isCash ? "#F02D95" : "#19C54B";

  const renderCopyQuestion = () => {
    if (confirmStatus === "confirmed" && !copied) {
      return (
        <View style={styles.copyContainer}>
          <Text style={styles.copyText}>
            Do you want to copy this bet for{" "}
            <Text style={{ color: isCash ? "#F02D95" : "#19C54B" }}>
              {isCash ? "coins" : "cash"}
            </Text>
            ?
          </Text>
          <View style={styles.copyButtonsRow}>
            <TouchableOpacity
              style={[styles.copyButton, { backgroundColor: "#282A2E" }]}
              onPress={() => {
                onDelete();
                if (bottomSheetRef.current) {
                  bottomSheetRef.current.close();
                }
              }}
            >
              <Text style={styles.copyButtonText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.copyButton, { backgroundColor: copyButtonColor }]}
              onPress={() => {
                toggleSwitch();
                if (mode === "Singles") {
                  setCardValues(items.map(() => "0"));
                } else {
                  setParlayValue("0");
                }
                setCopied(true);
                setConfirmStatus("default");
              }}
            >
              <Text style={styles.copyButtonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
      <View>
        {renderCards()}
        {renderPresets()}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Total Bet: {totalBet}</Text>
          <Text style={styles.summaryText}>
            Potential Win: {potentialWin.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            !inputsValid && styles.confirmButtonDisabled,
          ]}
          disabled={!inputsValid}
          onPress={handleConfirmPress}
        >
          {confirmStatus === "confirming" && (
            <ActivityIndicator
              size="small"
              color="#53470B"
              style={{ marginRight: 8 }}
            />
          )}
          <Text style={styles.confirmButtonText}>
            {confirmStatus === "default"
              ? "Confirm Bet"
              : confirmStatus === "confirming"
              ? "Confirming"
              : "Confirmed"}
          </Text>
        </TouchableOpacity>

        {renderCopyQuestion()}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: "row",
    backgroundColor: "#333539",
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "center",
    position: "relative",
    paddingLeft: 60,
  },
  deleteButton: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#4A4B4F",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  cardContent: {
    flex: 1,
    padding: 12,
  },
  cardText: {
    color: "white",
    fontSize: 16,
    marginVertical: 2,
  },
  parlayItem: {
    marginBottom: 8,
  },
  inputContainer: {
    width: 100,
    justifyContent: "center",
    paddingRight: 12,
  },
  textInput: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: "white",
    textAlign: "right",
    backgroundColor: "#47494D",
  },
  presetContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginTop: 16,
  },
  presetButton: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: "#555",
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  presetButtonText: {
    color: "white",
    fontSize: 16,
  },
  summaryContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  summaryText: {
    color: "white",
    fontSize: 18,
    marginVertical: 4,
  },
  confirmButton: {
    backgroundColor: "#FFE103",
    paddingVertical: 12,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  confirmButtonDisabled: {
    backgroundColor: "#5F5918",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#53470B",
  },
  copyContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    alignItems: "center",
  },
  copyText: {
    color: "white",
    fontSize: 16,
    marginBottom: 8,
  },
  copyButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  copyButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  copyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BetContents;
