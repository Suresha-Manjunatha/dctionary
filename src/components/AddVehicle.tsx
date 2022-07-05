import React, { FC } from "react";
import { Modal, View, TextInput, Button, Text, StyleSheet } from "react-native";

type AddVehicleProps = {
  isVisible: boolean;
  currentLot: number;
  handleAddModal: () => void;
  setShowAddModal: (show: boolean) => void;
  setReg: (reg: string) => void;
  regNumber: string;
};

const AddVehicleToDB: FC<AddVehicleProps> = ({
  isVisible,
  currentLot,
  handleAddModal,
  setShowAddModal,
  regNumber,
  setReg,
}) => {
  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.modal}>
        <Text>Add Vehicle to P{currentLot}</Text>
        <TextInput
          placeholder="Enterv reg. number"
          placeholderTextColor={"grey"}
          onChangeText={(text) => {
            setReg(text);
          }}
          style={styles.input}
        />

        <View style={styles.buttonRow}>
          <Button
            disabled={regNumber.length == 0}
            title="Add"
            onPress={handleAddModal}
          />
          <Button
            title="Cancel"
            onPress={() => {
              setShowAddModal(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AddVehicleToDB;

const styles = StyleSheet.create({
  input: {
    padding: 5,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
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
});
