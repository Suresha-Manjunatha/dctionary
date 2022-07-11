import React, { FC } from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

const { width } = Dimensions.get("window");

import { RandomWordType } from "../types/home";

const RandomWordShowcase: FC<RandomWordType> = ({
  word,
  definition,
  pronunciation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.text}>{`Word of the day`}</Text>
        <Text style={styles.textHeader}>{`Word:    ${word}`}</Text>
        <Text style={styles.paragraph}>{`Defination: ${definition} `}</Text>
        <Text
          style={styles.paragraph}
        >{`Peonunciation: ${pronunciation} `}</Text>
      </Card>
    </SafeAreaView>
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
  },
  card: {
    borderColor: "#000",
    borderWidth: 0.5,
  },
  textHeader: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 10,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 5,
  },
});
