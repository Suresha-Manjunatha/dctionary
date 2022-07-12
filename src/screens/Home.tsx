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
import { RandomWordType, DictionayAPI, RandomWordAPI } from "../types/home";
import RandomWordShowcase from "../components/RandomWordShowcase";
import FlatListRender from "../components/FlatListRender";
import SearchResult from "./SearchResult";

const { width } = Dimensions.get("window");

const Home: FC = () => {
  const [word, setWord] = useState<string>("");
  const [firstTime, setFirstTime] = useState<boolean>(true);
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
    if (firstTime) {
      fetch(RandomWordAPI)
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
    fetch(`${DictionayAPI}${searchWord ?? word}`)
      .then((data) => data.json())
      .then((jsonData) => {
        if (jsonData?.message) {
          setSnackbarData({
            isOpen: true,
            message: `Unable to fetch Info about ${searchWord ?? word} `,
          });
        } else {
          setWordInfo(jsonData);
          setFirstTime(false);
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
          ) : firstTime ? (
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
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 5,
    justifyContent: "center",
  },
  input: {
    padding: 5,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 10,
    marginRight: 2,
    width: width / 1.5,
    height: 40,
  },
  searchButton: {
    marginTop: 20,
    height: 40,
    width: 100,
  },
  indicatorStyle: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
});
