import React, { FC, useEffect, useState } from "react";
import { Modal, Text, Dimensions, View, ScrollView } from "react-native";
import { Snackbar } from "react-native-paper";
import { Card } from "react-native-paper";
import { StyleSheet } from "react-native";
// import SoundPlayer from "react-native-sound-player";
// import Sound from "react-native-sound";

import Button from "../components/Button";

const { width } = Dimensions.get("window");

type Props = {
  item: any;
  isOpen: boolean;
  onCancel: () => void;
};

const SearchResult: FC<Props> = ({ item, isOpen, onCancel }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAdudioFile] = useState({
    isAudioPresent: false,
    audioUrl: "",
  });
  const [snackbarData, setSnackbarData] = useState({
    isOpen: false,
    message: "",
  });

  const findAudioFile = () => {
    //finding audio file
    const audioFile = item?.phonetics?.find((a: { audio: any }) => a?.audio);

    if (audioFile) {
      setAdudioFile({
        isAudioPresent: true,
        audioUrl: audioFile?.audio,
      });
    }
  };

  const playPause = () => {};

  useEffect(() => {
    findAudioFile();
  }, []);

  const handleSnackbarDismiss = () => {
    setSnackbarData({ isOpen: false, message: "" });
  };

  return (
    <View style={styles.container2}>
      <Snackbar
        key={`snackbar-${snackbarData.isOpen}`}
        visible={snackbarData.isOpen}
        onDismiss={handleSnackbarDismiss}
        action={{
          label: "Close",
          onPress: handleSnackbarDismiss,
        }}
      >
        {snackbarData.message}
      </Snackbar>
      <Card style={styles.card}>
        <Text style={styles.textHeader}>{item?.word}</Text>
        <Text style={styles.paragraph}>
          {`pronunciation : ${item?.phonetic}`}{" "}
        </Text>
      </Card>
      <ScrollView style={styles.scroll}>
        {item?.meanings?.map((list) => {
          return (
            <Card style={styles.itemCard} key={`${list?.partOfSpeech}`}>
              <Text style={styles.partOfSpeech}>{list?.partOfSpeech}</Text>
              <Text style={styles.paragraph}>
                {list?.definitions?.[0].definition}{" "}
              </Text>
            </Card>
          );
        })}
      </ScrollView>

      {audioFile.isAudioPresent && (
        <Button
          title={!isPlaying ? "▶ Play" : "⏸ Pause"}
          onPress={playPause}
          style={styles.playButton}
        />
      )}

      <Button title="Close" onPress={onCancel} style={styles.buttonStyle} />
    </View>
  );
};

export default SearchResult;

export const styles = StyleSheet.create({
  container2: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderColor: "#000",
    borderWidth: 0.5,
    width: width - 35,
  },
  itemCard: {
    borderBottomColor: "#000",
    borderBottomWidth: 0.5,
    width: width - 35,
  },
  textHeader: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 5,
    marginLeft: 5,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 5,
  },
  partOfSpeech: {
    fontSize: 23,
    fontWeight: "bold",
    margin: 3,
    textDecorationLine: "underline",
  },
  scroll: {
    marginTop: 50,
  },
  buttonStyle: {
    marginBottom: 10,
    height: 40,
    width: width - 10,
    borderRadius: 10,
    backgroundColor: "#c9141a",
  },
  playButton: {
    marginBottom: 40,
    height: 40,
    width: 100,
    borderRadius: 40,
    backgroundColor: "gray",
  },
});
