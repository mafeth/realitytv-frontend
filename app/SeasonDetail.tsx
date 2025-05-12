import { StyleSheet, Image, Animated } from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Person, Season, Show } from "@/app/types";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import SeasonButton from "@/components/SeasonButton";

export default function ShowDetailScreen() {
  const route = useRoute();
  const { season } = route.params as { season: Season };
  const [scrollY] = useState(new Animated.Value(0));

  const [moderators, setModerators] = useState<Person[]>([]);
  const [participant, setParticipants] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);


  const colorScheme = useColorScheme();

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://192.168.178.42:8080/seasons/${season.seasonId}/persons`
      );
      const data: Season[] = await response.json();
      setModerators(data["moderators"]);
      setParticipants(data["participants"]);

      console.log(data);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Staffel " + season.seasonNumber || "Season Detail",
          headerBackTitle: "Show",
          headerTintColor: Colors[colorScheme ?? "light"].text,
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
          },
        }}
      />
        
        <View style={styles.contentContainer}>

        </View>

          
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
    backgroundColor: "lightgray",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: -0,
    left: 0,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  smallTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
});
