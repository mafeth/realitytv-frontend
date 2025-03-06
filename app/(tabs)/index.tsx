import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import InstagramStories, {
  InstagramStoriesPublicMethods,
  InstagramStoriesProps,
} from "@birdwingo/react-native-instagram-stories";
import { useEffect, useState, useRef } from "react";
import Colors from "@/constants/Colors";
import GenreTag from "@/components/GenreTag";
import ShowBox from "@/components/ShowBox";
import { useColorScheme } from "@/components/useColorScheme";
import { Show } from "@/app/types";
import { useNavigation } from "@react-navigation/native";
// import Acticity

export default function NewsScreen() {
  const ref = useRef<InstagramStoriesPublicMethods>(null);
  const setStories = () => ref.current?.setStories(stories);
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  const colorScheme = useColorScheme();

  useEffect(() => {
    fetchRunningShows();
  }, []);

  const fetchRunningShows = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://192.168.178.42:8080/shows/running`);
      const data: Show[] = await response.json();
      setShows(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const stories: InstagramStoriesProps["stories"] = [
    {
      // if using typescript - const stories: InstagramStoriesProps['stories']
      id: "user1",
      name: "Peter",

      avatarSource: {
        uri: "https://neweralive.na/wp-content/uploads/2024/06/lloyd-sikeba.jpg",
      },
      stories: [
        {
          id: "story1",
          source: {
            uri: "https://cdn.discordapp.com/attachments/831923551916392478/1339280162696593439/IMG_7100.png?ex=67ae2559&is=67acd3d9&hm=80e18524576a5a35b9197c123d15e65430912435b168c54c35cad432d6cddba9&",
          },
        },
        {
          id: "story2",
          source: {
            uri: "https://cdn.discordapp.com/attachments/831923551916392478/1339280162403123250/IMG_7101.png?ex=67ae2559&is=67acd3d9&hm=10162b9b9ae485a191b28cc51ab757769ee78368c3afbe02ff3a994a6813f7d7&",
          },
        },
      ],
    },
    {
      // if using typescript - const stories: InstagramStoriesProps['stories']
      id: "user2",
      name: "Kevin",
      avatarSource: {
        uri: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg",
      },
      stories: [
        {
          id: "story1",
          source: {
            uri: "https://cdn.discordapp.com/attachments/831923551916392478/1339280162696593439/IMG_7100.png?ex=67b6b719&is=67b56599&hm=20ce9955fa8e248758417c7f2598b523ac0fe84b3f802e5718640f23ad7d843c&",
          },
        },
        {
          id: "story2",
          source: {
            uri: "https://cdn.discordapp.com/attachments/831923551916392478/1339280162403123250/IMG_7101.png?ex=67b6b719&is=67b56599&hm=7bbe727c37c6c969f137a2af4c7aa793d6559f54d39ddc06fc70c4238cf253c4&",
          },
        },
      ],
    },
  ];

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.newsContainer}>
        {/* <Text style={styles.subTitle}>News:</Text> */}
        <InstagramStories
          ref={ref}
          stories={stories}
          showName={true}
          nameTextStyle={{ color: "white", fontSize: 14, textAlign: "center" }}
          avatarSize={70}
          // containerStyle={{ backgroundColor: "black", padding: 10, width: "100%" , height: 300}}
          avatarListContainerStyle={{ gap: 10 }}
          avatarBorderColors={["#D16BA5", "#86A8E7", "#5FFBF1"]}
          modalAnimationDuration={400}
          storyAnimationDuration={400}
          animationDuration={5000}
          imageStyles={{ height: "100%" }}
          // ...
        />
        {/* <Pressable onPress={setStories}>{<Text>KLICK</Text>}</Pressable> */}
      </View>
      <View style={styles.separator} />
      <Text style={styles.subTitle}>Laufende Serien:</Text>

      {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : shows.length === 0 ? (
              <Text style={styles.noShowsText}>
                Keine Shows gefunden. Versuche es mit einem anderen Suchbegriff.
              </Text>
            ) : (
              <ScrollView
                style={styles.scrollView}
                bounces={true}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                scrollEventThrottle={32}

              >
                {shows.map((show: Show) => (
                  
                  <View key={show.showId}>
                    <TouchableOpacity
                    // delayPressIn={0}
                    onPress={() => {
                      navigation.navigate("ShowDetail", { show });
                    }}
                    
                  >
                    <ShowBox show={show} />
                  </TouchableOpacity>
                  </View>
                  
                ))}
              </ScrollView>
            )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  scrollView: {
    width: "100%",
    // backgroundColor: "red",
    // flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle: {
    color: "gray",
    fontSize: 14,
    // textTransform: 'uppercase',
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "90%",
    backgroundColor: "gray",
  },
  newsContainer: {
    width: "100%",
    // height: 200,
    // backgroundColor: "red",
    padding: 10,
  },
  noShowsText: {
    color: "lightgray",
    fontSize: 16,
    textAlign: "center",
  },
});
