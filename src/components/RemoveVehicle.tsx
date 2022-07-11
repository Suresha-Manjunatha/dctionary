import React, { FC } from "react";
import { Modal, View, Button, Text, StyleSheet } from "react-native";
import { parkingLotDetailsType } from "../screens/SearchResult";

export type RemoveVehicleProps = {
  isVisible: boolean;
  currentLot: number;
  calculateHrsAmt: () => void;
  setShowRemoveModal: (show: boolean) => void;
  hours: number;
  amountToBePaid: number;
  setHours: (hrs: number) => void;
  setAmount: (amnt: number) => void;
  lotsList: parkingLotDetailsType[];
  setLotsList: (lotsList: parkingLotDetailsType[]) => void;
};

const RemoveVehicle: FC<RemoveVehicleProps> = ({
  isVisible,
  currentLot,
  setShowRemoveModal,
  hours,
  setHours,
  amountToBePaid,
  setAmount,
  calculateHrsAmt,
  lotsList,
  setLotsList,
}) => {
  function handleRemoveVehicle() {
    let newLotsList = lotsList.map((lot) => {
      if (lot.id == currentLot) {
        lot.free = true;
        lot.reg = "";
        lot.start = new Date(0, 0, 0);
      }
      return lot;
    });
    setLotsList(newLotsList);
    setShowRemoveModal(false);
  }

  return (
    <Modal
      visible={isVisible}
      onShow={() => {
        calculateHrsAmt();
      }}
      animationType="slide"
    >
      <View style={styles.modal}>
        <Text>Pay and Remove Vehicle from P{currentLot}</Text>
        <Text>Total hours: {hours}</Text>
        <Text>Total Amount:{amountToBePaid}</Text>

        <View style={styles.buttonRow}>
          <Button title="Remove" onPress={handleRemoveVehicle} />
          <Button
            title="Cancel"
            onPress={() => {
              setAmount(0);
              setHours(0);
              setShowRemoveModal(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default RemoveVehicle;

export const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  input: {
    padding: 5,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  parkingArea: {
    padding: "10%",
  },
  modal: {
    top: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center",
  },
  snack: {
    bottom: 5,
    backgroundColor: "red",
    padding: 10,
  },
  snackText: {
    color: "white",
  },
});
