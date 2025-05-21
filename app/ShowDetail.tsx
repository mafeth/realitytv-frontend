import {
  StyleSheet,
  Image,
  Animated,
  // TouchableOpacity,
  // Pressable,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack } from "expo-router";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Show, Season } from "@/app/types";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import GenreTag from "@/components/GenreTag";

import { GestureHandlerRootView, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";

import styles from "./ShowDetail.styles";

export default function ShowDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
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

  useEffect(() => {
    if (seasons.length > 0) {
      setExpandedSeason(seasons[0].seasonId); // Expand the top season initially
    }
  }, [seasons]);

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
    <GestureHandlerRootView style={{flex: 1}}>
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
            <TouchableWithoutFeedback
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
            </TouchableWithoutFeedback>
            <Text style={styles.subTitle}>Staffeln:</Text>


            {seasons.map((season) => (
              <View key={season.seasonId}>
                <TouchableWithoutFeedback
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
                </TouchableWithoutFeedback>
                {expandedSeason === season.seasonId && (
                  <View style={styles.seasonContent}>
                    <Text style={{ fontWeight: "bold" }}>
                      {formatDate(season.startDate)} -{" "}
                      {formatDate(season.endDate)}
                      {"  •  "}
                      {season.participants.length} Teilnehmer
                    </Text>
                    <View style={styles.participantsContainer}>
                      {season.participants.map((p) => (
                        <TouchableOpacity
                          key={p.personId}
                          style={styles.personContainer}
                          onPress={() =>
                              navigation.navigate("PersonDetail", {
                                person: p,
                                show: show,
                                season: season,
                              })
                            }
                        >
                          <View style={styles.personImageContainer}>
                            <Image
                              source={{ uri: p.imageUrl }}
                              style={{ width: "100%", height: "100%", borderRadius: 90 }}
                            />
                          </View>
                          <Text style={styles.personInfoText}>
                            {p.name} ({calculateAge(p.birthDate)})
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            ))}

          </View>

        </Animated.ScrollView>

      </View>
    </GestureHandlerRootView>
  );
}

