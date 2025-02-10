import {
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Show, Season } from "@/app/types";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import GenreTag from "@/components/GenreTag";

export default function ShowDetailScreen() {
  const route = useRoute();
  const { show } = route.params as { show: Show };
  const [scrollY] = useState(new Animated.Value(0));
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [descriptionLines, setDescriptionLines] = useState<number>(4);
  const [loading, setLoading] = useState(true);
  const [expandedSeason, setExpandedSeason] = useState<string | null>(null);

  const colorScheme = useColorScheme();

  const streamingIcons = {
    "RTL+":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/RTL%2B_Logo_2021.svg/320px-RTL%2B_Logo_2021.svg.png",
    Joyn: "https://upload.wikimedia.org/wikipedia/de/thumb/7/74/Joyn_%28Streaminganbieter%29_logo.svg/320px-Joyn_%28Streaminganbieter%29_logo.svg.png",
    "Sat.1":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Neues_Sat._1_Logo_transparent.png/240px-Neues_Sat._1_Logo_transparent.png",
    ProSieben:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/ProSieben_logo.svg/240px-ProSieben_logo.svg.png",
    Netflix:
      "https://cdn.iconscout.com/icon/free/png-256/free-netflix-3521600-2945044.png?f=webp",
    "Paramount+":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Paramount_Plus.svg/320px-Paramount_Plus.svg.png",
    "RTL II":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/RTLZWEI_Logo_2019.svg/310px-RTLZWEI_Logo_2019.svg.png",
    "RTL2": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/RTLZWEI_Logo_2019.svg/310px-RTLZWEI_Logo_2019.svg.png",
    "RTL": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/RTL_Logo_2022.png/320px-RTL_Logo_2022.png",
  };

  function formatDate(inputDate: string): string {
    // Überprüfen, ob das Eingabeformat korrekt ist
    if (!/^\d{4}-\d{2}-\d{2}$/.test(inputDate)) {
      return "heute";
    }

    const [year, month, day] = inputDate.split("-");
    return `${day}.${month}.${year}`;
  }

  function calculateAge(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  useEffect(() => {
    fetchSeasons();
  }, []);

  const fetchSeasons = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://192.168.178.42:8080/shows/${show.showId}/seasons`
      );
      const data: Season[] = await response.json();
      setSeasons(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const parseDate = (dateString: string) => new Date(dateString);

  const toggleSeason = (seasonId: string) => {
    setExpandedSeason(expandedSeason === seasonId ? null : seasonId);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: show.title || "Show Detail",
          headerBackTitle: "Entdecken",
          headerTintColor: Colors[colorScheme ?? "light"].text,
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
          },
        }}
      />
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View
          style={[
            styles.bannerContainer,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [-200, 0, 200],
                    outputRange: [-100, 0, 0],
                    extrapolate: "clamp",
                  }),
                },
                {
                  scale: scrollY.interpolate({
                    inputRange: [-200, 0, 200],
                    outputRange: [1.5, 1, 1],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <Image source={{ uri: show.bannerUrl }} style={styles.bannerImage} />
          <View style={styles.overlayContainer}>
            <View style={styles.overlayUp}>
              <FontAwesome
                name="heart"
                size={27}
                color="#de092d"
                style={{
                  padding: 7,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  borderRadius: 90,
                  opacity: 0.9,
                }}
              />
            </View>

            <View style={styles.overlayDown}>
              <View style={styles.overlayDownLeft}>
                {show.genre.split(", ").map((genre) => (
                  <GenreTag key={genre}>{genre}</GenreTag>
                ))}
              </View>
              <View style={styles.overlayDownRight}>
                {show.streamingServices.split(", ").map((service) => (
                  <Image
                    key={service}
                    style={styles.streamingIcon}
                    source={{ uri: streamingIcons[service] }}
                  />
                ))}
              </View>
            </View>
          </View>
        </Animated.View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{show.title}</Text>
          <Text style={styles.years}>
            {show.endDate
              ? parseDate(show.startDate).getFullYear() +
                " - " +
                parseDate(show.endDate).getFullYear()
              : "seit " + parseDate(show.startDate).getFullYear()}
          </Text>
          <Pressable
            onPress={() => setDescriptionLines(descriptionLines === 4 ? 0 : 4)}
          >
            <Text
              numberOfLines={descriptionLines}
              style={[
                styles.description,
                { color: Colors[colorScheme ?? "light"].text },
              ]}
            >
              {show.description}
            </Text>
          </Pressable>
          <Text style={styles.subTitle}>Staffeln:</Text>

          {seasons.map((season) => (
            <View key={season.seasonId}>
              <TouchableOpacity
                onPress={() => toggleSeason(season.seasonId)}
                style={[
                  styles.seasonButton,
                  {
                    backgroundColor:
                      Colors[colorScheme ?? "light"].secondaryBackground,
                  },
                ]}
              >
                <Text style={styles.seasonTitle}>
                  Staffel {season.seasonNumber} (
                  {season.startDate.split("-")[0]})
                </Text>

                <FontAwesome
                  name={
                    expandedSeason === season.seasonId
                      ? "chevron-up"
                      : "chevron-down"
                  }
                  size={20}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
              {expandedSeason === season.seasonId && (
                <View style={styles.seasonContent}>
                  <Text style={{ fontWeight: "bold" }}>
                    {formatDate(season.startDate)} -{" "}
                    {formatDate(season.endDate)}
                    {"  •  "}
                    {season.participants.length} Teilnehmer
                  </Text>
                  <View style={styles.participantsContainer}>

                    {
                      season.participants.map((participant) => (
                        <View style={styles.personContainer} key={participant.personId}>
                          <View style={styles.personImageContainer}>
                            <Image
                              source={{ uri: participant.imageUrl }}
                              style={{ width: "100%", height: "100%", borderRadius: 90 }}
                            />
                          </View>
                          <Text style={styles.personInfoText}>
                            {participant.name} ({calculateAge(participant.birthDate)})
                          </Text>
                        </View>
                      ))
                    }

                    
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollView: {
    width: "100%",
  },
  bannerContainer: {
    width: "100%",
    height: 200,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  overlayContainer: {
    position: "absolute",
    // bottom: 20,
    // left: 20,
    backgroundColor: "rgba(0,0,0)",
    // padding: 10,
    width: "100%",
    height: "100%",
    // borderRadius: 5,
  },
  overlayUp: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: 10,
    backgroundColor: "rgba(0,0,0)",
    flexDirection: "row",
  },
  overlayDown: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "rgba(0,0,0,0.0)",
    flexDirection: "row",
  },
  overlayDownLeft: {
    flex: 1,
    // justifyContent: "flex-end",
    alignContent: "flex-end",
    // alignItems: "flex-start",
    backgroundColor: "rgba(200,0,0,0.0)",
    flexDirection: "row",
    flexWrap: "wrap-reverse",
    gap: 5,
    padding: 5,
  },
  overlayDownRight: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "rgba(0,0,200,0.0)",
    flexDirection: "row",
    flexWrap: "wrap-reverse",
  },
  streamingIcon: {
    height: 45,
    aspectRatio: 1,
    resizeMode: "contain",
    // alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 90,
    margin: 5,
    padding: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    // marginBottom: 10,
  },
  years: {
    fontSize: 18,
    marginBottom: 10,
    color: "lightgray",
    fontStyle: "italic",
    width: "100%",
    textAlign: "left",
    opacity: 0.7,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: "lightgray",
    textAlign: "left",
  },
  seasonButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 5,
    backgroundColor: "#1b1e2b",
    borderRadius: 4,
  },
  seasonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
  },
  seasonContent: {
    paddingVertical: 10,
    marginLeft: 15,
    marginBottom: 15,
  },
  participantsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    // height: 100,
    // backgroundColor: "red",
    justifyContent: "space-between",
  },
  personContainer: {
    // backgroundColor: "blue",
    margin: 5,
    alignItems: "center",
    justifyContent: "flex-start", // Changed from "center" to "flex-start"
    // flexDirection: "row",
    // backgroundColor: "red",
    width: '30%',
  },
  personInfoText: {
    textAlign: "center",
    marginTop: 4,
    wordWrap: "normal",
  },
  personImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 90,
    backgroundColor: "lightgray",
    marginTop: 5,
  },
});
