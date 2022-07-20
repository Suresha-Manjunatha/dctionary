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
  Text,
} from "react-native";
import { ActivityIndicator, Card, Snackbar } from "react-native-paper";

import Button from "../components/Button";
import SearchResult from "./SearchResult";

const { width } = Dimensions.get("window");

const Home: FC = () => {
  const [word, setWord] = useState<string>("");
  const [start, setStart] = useState<boolean>(true);
  const [randomWord, setRandomWord] = useState({} as any);
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
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.container1}
              onPress={() => {
                handleSearch(randomWord.word);
              }}
            >
              <Card style={styles.card}>
                <Text style={styles.text}>Word of the day</Text>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text style={{ fontSize: 22 }}>Word:</Text>
                  <Text style={styles.textHeader}> {randomWord.word}</Text>
                </View>

                <Text style={styles.paragraph}>
                  Defination: {randomWord.definition}{" "}
                </Text>
                <Text style={styles.paragraph}>
                  Peonunciation: {randomWord.pronunciation}{" "}
                </Text>
              </Card>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity activeOpacity={0.7} style={styles.container1}>
              <FlatList
                data={wordInfo}
                keyExtractor={(item) => `${Math.random() * 1985}Id}`}
                renderItem={({ item }: any) => (
                  <TouchableOpacity
                    style={styles.container2}
                    onPress={() => {
                      setModalData({
                        isOpen: true,
                        item,
                      });
                    }}
                  >
                    <Card style={styles.card1}>
                      <Text style={styles.textHeader1}>{item?.word}</Text>
                      <Text style={styles.paragraph1}>
                        {item?.meanings[0]?.definitions[0]?.definition}{" "}
                      </Text>
                    </Card>
                  </TouchableOpacity>
                )}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;

export const styles = StyleSheet.create({
  root: {
    width: "100%",
    flex: 1,
    backgroundColor: "#f6f1eb",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  container: {
    height: "20%",
    flexDirection: "row",
    paddingHorizontal: 15,
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
    marginTop: 10,
    height: 40,
    width: 100,
  },
  indicatorStyle: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
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
  container1: {
    display: "flex",
    justifyContent: "center",
    margin: 10,
    alignItems: "center",
  },
  paragraph: {
    fontSize: 18,
  },

  card1: {
    borderColor: "#000",
    borderWidth: 0.5,
    width: width - 35,
  },
  textHeader1: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 5,
    marginLeft: 5,
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    margin: 10,
  },
  paragraph1: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 5,
  },
});
