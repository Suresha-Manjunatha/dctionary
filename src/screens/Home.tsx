import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC, useState } from "react";
import { Button, SafeAreaView, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { routesType } from "../navigation/AppStack";

const Home: FC = () => {
  const [lots, setLots] = useState<number>(0);

  const navigation = useNavigation<NativeStackNavigationProp<routesType>>();

  return (
    <SafeAreaView testID="home" style={styles.container}>
      <TextInput
        placeholder="Enter number of Parking Lots"
        placeholderTextColor={"grey"}
        keyboardType="numeric"
        onChangeText={(text) => setLots(Number(text))}
        style={styles.input}
      />
      <Button
        disabled={lots == 0}
        title="Submit"
        onPress={() => {
          navigation.navigate("ParkingSpace", { lots: lots });
        }}
      />
    </SafeAreaView>
  );
};

export default Home;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 5,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
});
