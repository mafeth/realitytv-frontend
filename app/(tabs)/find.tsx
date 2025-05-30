import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { Pressable, View, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Show } from "@/app/types";
import { useNavigation } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import ShowBox from "@/components/ShowBox";
import { GlobalContext } from "../GlobalContext";

export default function ExploreScreen() {
  const [shows, setShows] = useState<Show[]>([]);
  const [query, setQuery] = useState("");

  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error(
      "GlobalContext muss innerhalb eines GlobalProvider verwendet werden"
    );
  }

  const { globalObject } = context;

  useEffect(() => {
    setShows(globalObject.shows);
  }, [globalObject.shows]);

  useEffect(() => {
    const filteredShows = globalObject.shows.filter(
      (show) =>
        show.title.toLowerCase().includes(query.toLowerCase()) ||
        show.description.toLowerCase().includes(query.toLowerCase())
    );
    setShows(filteredShows);
  }, [query, globalObject.shows]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "light"].background },
      ]}
    >
      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: Colors[colorScheme ?? "light"].secondaryBackground,
          },
        ]}
      >
        <View
          style={[
            styles.textInputContainer,
            {
              backgroundColor:
                Colors[colorScheme ?? "light"].secondaryBackground,
            },
          ]}
        >
          <TextInput
            placeholder="Suchen..."
            placeholderTextColor="gray"
            autoCorrect={false}
            autoCapitalize="none"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChangeText={setQuery}
            style={styles.textInput}
          />
          {query.length > 0 && (
            <Pressable
              onPress={() => {
                setQuery("");
              }}
              style={styles.clearButton}
            >
              <FontAwesome name="times-circle" size={20} color="gray" />
            </Pressable>
          )}
        </View>
        <Link href="/modal" asChild>
          <Pressable style={{ marginLeft: 10 }}>
            {({ pressed }) => (
              <FontAwesome
                name="filter"
                size={24}
                color="white"
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      </View>

      <ScrollView
        style={styles.scrollView}
        bounces={true}
        showsVerticalScrollIndicator={false}
      >
        {shows.map((show: Show) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ShowDetail", { show });
            }}
            key={show.showId}
            style={{ marginBottom: 10 }}
          >
            <ShowBox key={show.showId} show={show} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    // backgroundColor: Colors[colorScheme ?? "light"].background,
  },
  scrollView: {
    width: "100%",
  },
  searchContainer: {
    width: "100%",
    padding: 10,
    // backgroundColor: "#1b1e2b",
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  textInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#2b2e3b",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    color: "white",
    paddingVertical: 10,
  },
  clearButton: {
    marginLeft: 5,
    opacity: 0.5,
    color: "lightgray",
  },
  showTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  showDescription: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
    flex: 1,
    color: "lightgray",
  },
  showContainer: {
    width: "100%",
    height: 220,
    alignItems: "center",
    backgroundColor: "#1b1e2b",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  showImageContainer: {
    width: 140,
    height: "100%",
    backgroundColor: "gray",
    borderRadius: 10,
  },
  showImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  showRight: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    backgroundColor: "#1b1e2b",
    paddingLeft: 10,
    paddingVertical: 6,
  },
  showGenreTagContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 2,
    backgroundColor: "#1b1e2b",
  },
  noShowsText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});
