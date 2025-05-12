import { Text, TextProps, View } from "./Themed";
import { StyleSheet, Image } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import GenreTag from "@/components/GenreTag";
import { TouchableOpacity } from "react-native";
// import { navigation } from 'expo-router/build/global-state/routing';
import { useNavigation } from "@react-navigation/native";
import { Season, Show } from "@/app/types";

export default function ShowBox({
  show,
  displayedSeason,
}: {
  show: Show;
  displayedSeason?: Season;
}) {
  const navigation = useNavigation();

  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.showContainer,
        {
          backgroundColor: Colors[colorScheme ?? "light"].secondaryBackground,
        },
      ]}
    >
      <View style={styles.showImageContainer}>
        <Image source={{ uri: show.thumbnailUrl }} style={styles.showImage} />
        {show.running && <Text style={styles.runningTag}>LIVE</Text>}
      </View>
      <View
        style={[
          styles.showRight,
          {
            backgroundColor: Colors[colorScheme ?? "light"].secondaryBackground,
          },
        ]}
      >
        <Text
          style={[
            styles.showTitle,
            { color: Colors[colorScheme ?? "light"].text },
          ]}
        >
          {show.title}
        </Text>
        {displayedSeason ? (
          <Text style={{fontWeight: 'bold', color: '#aac0ce'}}>
            Staffel {displayedSeason.seasonNumber} (
            {new Date(displayedSeason.startDate).getFullYear()})
          </Text>
        ) : null}
        <Text
          style={[
            styles.showDescription,
            { color: Colors[colorScheme ?? "light"].text },
          ]}
          numberOfLines={8}
          ellipsizeMode="tail"
        >
          {show.description}
        </Text>
        <View
          style={[
            styles.showGenreTagContainer,
            {
              backgroundColor:
                Colors[colorScheme ?? "light"].secondaryBackground,
            },
          ]}
        >
          {show.genre.split(", ").map((genre) => (
            <GenreTag key={genre}>{genre}</GenreTag>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  showTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    color: "white",
  },
  showDescription: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "left",
    // marginLeft: 3,
    flex: 1,
    color: "lightgray",
  },
  showContainer: {
    width: "100%",
    height: 220,
    alignItems: "center",

    padding: 10,
    // marginBottom: 10,
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
    paddingVertical: 2,
  },
  showGenreTagContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 2,
    backgroundColor: "#1b1e2b",
  },
  runningTag: {
    position: "absolute",
    top: 3,
    left: 3,
    backgroundColor: "red",
    opacity: 0.65,
    color: "white",
    padding: 5,
    borderRadius: 90,
  },
});
