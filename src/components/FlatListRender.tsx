import React, { FC } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { parkingLotDetailsType } from "../screens/ParkingSpace";

export type FlatListRenderProps = {
  item: parkingLotDetailsType;
  handleAdd: (free: boolean) => void;
  setCurrentLot: (id: number) => void;
  handleRemove: () => void;
};

const FlatListRender: FC<FlatListRenderProps> = ({
  item,
  handleAdd,
  setCurrentLot,
  handleRemove,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setCurrentLot(item.id);
        item.free ? handleAdd(false) : handleRemove();
      }}
    >
      <View
        style={{
          ...styles.item,
          backgroundColor: item.free ? "green" : "red",
        }}
      >
        <Text style={styles.itemText}>P{item.id}</Text>
        <Text style={styles.itemText}>
          {item.free ? "Free" : `Occupied by ${item.reg}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FlatListRender;

export const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 15,
    padding: 20,
  },
  itemText: {
    color: "white",
  },
});
