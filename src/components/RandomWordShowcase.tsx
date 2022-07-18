import React, { FC } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { Card } from "react-native-paper";

const { width } = Dimensions.get("window");

import { RandomWordType } from "../types/home";

const RandomWordShowcase: FC<RandomWordType> = ({
  word,
  definition,
  pronunciation,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress}
    >
      <Card style={styles.card}>
        <Text style={styles.text}>Word of the day</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ fontSize: 22 }}>Word:</Text>
          <Text style={styles.textHeader}> {word}</Text>
        </View>

        <Text style={styles.paragraph}>Defination: {definition} </Text>
        <Text style={styles.paragraph}>Peonunciation: {pronunciation} </Text>
      </Card>
    </TouchableOpacity>
  );
};

export default RandomWordShowcase;

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    paddingBottom: 20,
    marginTop: 10,
    textDecorationLine: "underline",
    color: "#3a6599",
  },
  card: {
    borderColor: "#000",
    borderWidth: 0.5,
    padding: 10,
  },
  textHeader: {
    fontSize: 22,
    fontWeight: "bold",

    fontStyle: "italic",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    margin: 10,
    alignItems: "center",
  },
  paragraph: {
    fontSize: 18,
  },
});
