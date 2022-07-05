import React, { FC, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Snackbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import FlatListRender from "../components/FlatListRender";
import AddVehicleToDB from "../components/AddVehicle";
import RemoveVehicle from "../components/RemoveVehicle";

export type parkingLotDetailsType = {
  id: number;
  reg: string;
  free: boolean;
  start: Date;
};

export type lotsPropsType = {
  route: {
    params: {
      lots: number;
    };
  };
};

const ParkingSpace: FC<lotsPropsType> = (props) => {
  const [lotsList, setLotsList] = useState<parkingLotDetailsType[]>([]);
  const [currentLot, setCurrentLot] = useState<number>(0);
  const [freeLotsList, setFreeLotsList] =
    useState<parkingLotDetailsType[]>(lotsList);
  const [reg, setReg] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
  const [showSnack, setShowSnack] = useState<boolean>(false);

  const [hrs, setHrs] = useState<number>(0);
  const [amnt, setAmnt] = useState<number>(0);

  useEffect(() => {
    drawLots();
  }, []);

  useEffect(() => {
    setFreeLotsList(lotsList.filter((lot) => lot.free));
  }, [lotsList]);

  function drawLots() {
    let lotsArray = [];
    for (let i = 0; i < props.route.params.lots; i++) {
      lotsArray.push({
        id: i,
        reg: "",
        free: true,
        start: new Date(0, 0, 0),
      });
    }
    setLotsList(lotsArray);
  }

  function getRandom() {
    const randomNum = Math.floor(Math.random() * freeLotsList.length);
    setCurrentLot(freeLotsList[randomNum].id);
  }

  function handleAdd(random: boolean) {
    console.log("Inside handle add function");
    setReg("");
    if (freeLotsList.length > 0) {
      if (random) {
        getRandom();
      }
      if (currentLot >= 0) {
        setShowAddModal(true);
      }
    } else {
      setShowSnack(true);
      setTimeout(() => {
        setShowSnack(false);
      }, 2000);
    }
  }

  function handleRemove() {
    !lotsList[currentLot].free && setShowRemoveModal(true);
  }

  function calculateHrsAmt() {
    const timeDiffms = Math.abs(
      lotsList[currentLot].start.getTime() - new Date().getTime()
    );
    const timeDiffHrs = Math.floor(timeDiffms / (1000 * 60 * 60));
    setHrs(timeDiffHrs);

    if (timeDiffHrs <= 2) {
      setAmnt(10);
    } else {
      setAmnt(10 + (timeDiffHrs - 2) * 10);
    }
  }

  function handleAddModal() {
    console.log("Inside handle add modal function");
    if (reg.length) {
      setLotsList(
        lotsList.map((lot) => {
          return lot.id == currentLot
            ? {
                ...lot,
                free: false,
                reg: reg,
                start: new Date(),
              }
            : lot;
        })
      );
      setShowAddModal(false);
    }
  }

  return (
    <SafeAreaView testID="lots" style={styles.container2}>
      <AddVehicleToDB
        isVisible={showAddModal}
        currentLot={currentLot}
        handleAddModal={handleAddModal}
        setShowAddModal={(show: boolean) => setShowAddModal(show)}
        setReg={(reg: string) => setReg(reg)}
        regNumber={reg}
      />

      <RemoveVehicle
        isVisible={showRemoveModal}
        currentLot={currentLot}
        calculateHrsAmt={calculateHrsAmt}
        setShowRemoveModal={(show: boolean) => setShowRemoveModal(show)}
        hours={hrs}
        amountToBePaid={amnt}
        setHours={(hrs: number) => setHrs(hrs)}
        setAmount={(amnt: number) => setAmnt(amnt)}
        lotsList={lotsList}
        setLotsList={(lotsList: parkingLotDetailsType[]) =>
          setLotsList(lotsList)
        }
      />

      <Snackbar
        visible={showSnack}
        onDismiss={() => setShowSnack(false)}
        style={styles.snack}
      >
        <Text style={styles.snackText}>the parking is full</Text>
      </Snackbar>

      <TouchableOpacity
        onPress={() => handleAdd(true)}
        style={styles.parkingArea}
      >
        <FlatList
          data={lotsList}
          renderItem={({ item }) => (
            <FlatListRender
              item={item}
              handleAdd={handleAdd}
              setCurrentLot={(id) => {
                setCurrentLot(id);
              }}
              handleRemove={handleRemove}
            />
          )}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ParkingSpace;

export const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
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
