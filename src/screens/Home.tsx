import React, { FC, useState, useEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { ActivityIndicator, Snackbar } from "react-native-paper";

import Button from "../components/Button";
import { RandomWordType } from "../types/home";
import RandomWordShowcase from "../components/RandomWordShowcase";
import FlatListRender from "../components/FlatListRender";
import SearchResult from "./SearchResult";

const { width } = Dimensions.get("window");

const Home: FC = () => {
  const [word, setWord] = useState<string>("");
  const [start, setStart] = useState<boolean>(true);
  const [randomWord, setRandomWord] = useState({} as RandomWordType);
  const [wordInfo, setWordInfo] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modelData, setModalData] = useState({
    isOpen: false,
    item: { meanings: [{ definitions: [""] }] },
  });
  const [snackbarData, setSnackbarData] = useState({
    isOpen: false,
    message: "",
  });

  useEffect(() => {
    if (start) {
      fetch("https://random-words-api.vercel.app/word")
        .then((data) => data.json())
        .then((data) => {
          setRandomWord(data[0]);
        })
        .catch(() => {
          setSnackbarData({
            isOpen: true,
            message: "Unable to fetch Random Word",
          });
        });
    }
  }, []);

  const handleSearch = (searchWord?: string) => {
    setLoading(true);
    fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord ?? word}`
    )
      .then((data) => data.json())
      .then((jsonData) => {
        if (jsonData?.message) {
          setSnackbarData({
            isOpen: true,
            message: `Unable to fetch Info about ${searchWord ?? word} `,
          });
        } else {
          setWordInfo(jsonData);
          setStart(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        setWordInfo([]);
        setSnackbarData({
          isOpen: true,
          message: `Unable to fetch Info about ${word} `,
        });
        setLoading(false);
      });
  };

  const handleSnackbarDismiss = () => {
    console.log("Dissmissed");
    setSnackbarData({ isOpen: false, message: "" });
  };

  const handleModelClose = () => {
    setWord("");
    setModalData({
      isOpen: false,
      item: {
        meanings: {
          //@ts-ignore
          definitions: [""],
        },
      },
    });
  };

  return (
    <SafeAreaView testID="home" style={styles.root}>
      <Snackbar
        key={`snackbar-${snackbarData.isOpen}`}
        visible={snackbarData.isOpen}
        onDismiss={handleSnackbarDismiss}
        duration={2000}
        action={{
          label: "Close",
          color: "red",
          onPress() {
            handleSnackbarDismiss();
          },
        }}
      >
        {snackbarData.message}
      </Snackbar>
      {modelData.isOpen ? (
        <SearchResult
          item={modelData.item}
          isOpen={modelData.isOpen}
          onCancel={handleModelClose}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <TextInput
              placeholder="Enter keyword"
              placeholderTextColor={"grey"}
              onChangeText={(text) => setWord(text)}
              style={styles.input}
            />
            <Button
              title="Search"
              disabled={word.length === 0}
              onPress={() => handleSearch()}
              style={styles.searchButton}
              loading={loading}
            />
          </View>
          {loading ? (
            <ActivityIndicator size={40} style={styles.indicatorStyle} />
          ) : start ? (
            <RandomWordShowcase
              word={randomWord.word}
              definition={randomWord.definition}
              pronunciation={randomWord.pronunciation}
              onPress={() => {
                handleSearch(randomWord.word);
              }}
            />
          ) : (
            <FlatList
              data={wordInfo}
              keyExtractor={(item) => `${Math.random() * 1985}Id}`}
              renderItem={({ item }) => (
                <FlatListRender
                  item={item}
                  onClick={() => {
                    setModalData({
                      isOpen: true,
                      item,
                    });
                  }}
                />
              )}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;

export const styles = StyleSheet.create({
  root: {
    width: width,
    flex: 1,
    backgroundColor: "#f6f1eb",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  container: {
    height: "20%",
    flexDirection: "row",
    // paddingLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  input: {
    padding: 5,
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
    marginRight: 2,
    width: "80%",
    height: 40,
  },
  searchButton: {
    marginTop: 15,
    height: 40,
    width: 100,
  },
  indicatorStyle: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
});
