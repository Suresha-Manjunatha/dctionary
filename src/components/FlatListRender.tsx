import React, { FC } from "react";
import { TouchableOpacity, View, Text, Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";

const { width } = Dimensions.get("window");

export type FlatListRenderProps = {
  item: any;
  onClick: (free: boolean) => void;
};

const FlatListRender: FC<FlatListRenderProps> = ({ item, onClick }) => {
  React.useEffect(() => {
    console.log(item);
  }, []);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onClick(item?.free);
      }}
    >
      <Card style={styles.card}>
        <Text style={styles.textHeader}>{item?.word}</Text>
        <Text style={styles.paragraph}>
          {item?.meanings[0]?.definitions[0]?.definition}{" "}
        </Text>
      </Card>
    </TouchableOpacity>
  );
};

export default FlatListRender;

export const styles = StyleSheet.create({
  card: {
    borderColor: "#000",
    borderWidth: 0.5,
    width: width - 35,
  },
  textHeader: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 5,
    marginLeft: 5,
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
