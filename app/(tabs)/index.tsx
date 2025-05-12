import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from "react-native";

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import InstagramStories, {
  InstagramStoriesPublicMethods,
  InstagramStoriesProps,
} from "@birdwingo/react-native-instagram-stories";
import { useEffect, useState, useRef, useContext, ReactNode } from "react";
import Colors from "@/constants/Colors";
import GenreTag from "@/components/GenreTag";
import ShowBox from "@/components/ShowBox";
import { useColorScheme } from "@/components/useColorScheme";
import { Season, Show } from "@/app/types";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../GlobalContext";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
// import Acticity

export default function NewsScreen() {
  const ref = useRef<InstagramStoriesPublicMethods>(null);
  const setStories = () => ref.current?.setStories(stories);
  // const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  const colorScheme = useColorScheme();

  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error(
      "GlobalContext muss innerhalb eines GlobalProvider verwendet werden"
    );
  }

  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
  });

  const { globalObject, setGlobalObject } = context;

  function getLatestSeason(show: Show): Season {
    return show.seasons[0];
  }

  const localBackgroundUri = Image.resolveAssetSource(
    require("../../assets/images/background.png")
  ).uri;

  const B = (props) => <Text style={{fontWeight: 'bold', color: 'black'}}>{props.children}</Text>

  const stories: InstagramStoriesProps["stories"] = [
    {
      // if using typescript - const stories: InstagramStoriesProps['stories']
      id: "0",
      name: "Vanessa vs. Sophie",
      avatarSource: {
        uri: "https://content2.promiflash.de/article-images/video_480/vanessa-brahimi-laechelt.jpg",
      },
      stories: [
        {
          id: "story1",
          source: { uri: localBackgroundUri },
          renderContent: () => (
            <View style={styles.storyCoverContainer}>
              <Image
                style={styles.storyCoverImage}
                src="https://content3.promiflash.de/article-images/cinema450/vanessa-brahimi-und-sophie-welack-collage-2.jpg"
              />
              <View style={styles.storyCoverContentContainer}>
                <Text style={styles.storyCoverSubtitle}>Promi-Streit:</Text>
                <Text style={styles.storyCoverTitle}>
                  Vanessa und Sophie zoffen sich im Netz
                </Text>
                <View style={styles.storyCoverSourceContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      backgroundColor: "#00000000",
                    }}
                  >
                    <FontAwesome
                      name="link"
                      size={25}
                      color={"black"}
                      style={{ alignSelf: "center", marginRight: 10 }}
                    />
                    <Image
                      style={styles.storyCoverSourceLogo}
                      src="https://content.promiflash.de/static-images/header-transparent-v1.png"
                    />
                  </View>

                  <Text>
                    29.03.25, 14:12 Uhr{"\n"}
                    Anja-Stine Andresen
                  </Text>
                </View>
              </View>
            </View>
          ),
        },
        {
          id: "story2",
          source: { uri: localBackgroundUri },
          renderContent: () => (
            <View style={styles.storyCoverContainer}>
              <View style={styles.storySlideHeader}>
                <Text style={{color: 'white', fontSize: 34, fontWeight: 'bold'}}>Was ist passiert?</Text>

              </View>
              <View style={styles.storySlideContentContainer}>
                
                <View style={styles.storySlideBulletPointContainer}>
                  <AntDesign name="rightsquare" size={40} color={'#ff006680'}/>
                  <Text style={styles.storySlideBulletPointText}>Sophie postet ein <B>Foto von Hackfleisch</B> mit einer Figur, die <B>Vanessa ähneln</B> soll.</Text>
                </View>
                <View style={styles.storySlideBulletPointContainer}>
                  <AntDesign name="rightsquare" size={40} color={'#ff006680'}/>
                  <Text style={styles.storySlideBulletPointText}>Vanessa kontert und <B>kritisiert</B> Sophies Nutzung von Filtern auf Social Media</Text>
                </View>
                <View style={styles.storySlideBulletPointContainer}>
                  <AntDesign name="rightsquare" size={40} color={'#ff006680'}/>
                  <Text style={styles.storySlideBulletPointText}>Der Streit <B>eskaliert</B> mit weiteren gegenseitigen Vorwürfen und <B>Beleidigungen</B></Text>
                </View>

                <View style={styles.storyCoverSourceContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      backgroundColor: "#00000000",
                    }}
                  >
                    <FontAwesome
                      name="link"
                      size={25}
                      color={"black"}
                      style={{ alignSelf: "center", marginRight: 10 }}
                    />
                    <Image
                      style={styles.storyCoverSourceLogo}
                      src="https://content.promiflash.de/static-images/header-transparent-v1.png"
                    />
                  </View>

                  <Text style={{color: 'black'}}>
                    29.03.25, 14:12 Uhr{"\n"}
                    Anja-Stine Andresen
                  </Text>
                </View>
              </View>
            </View>
          ),
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
          nameTextStyle={{
            color: "white",
            fontSize: 14,
            textAlign: "center",
            paddingTop: 3,
          }}
          avatarSize={70}
          // containerStyle={{ backgroundColor: "black", padding: 10, width: "100%" , height: 300}}
          avatarListContainerStyle={{ gap: 10 }}
          avatarBorderColors={["#D16BA5", "#86A8E7", "#5FFBF1"]}
          modalAnimationDuration={400}
          storyAnimationDuration={400}
          animationDuration={5000}
          imageStyles={{ resizeMode: "cover" }}
          mediaContainerStyle={{ backgroundColor: "#ffffff" }}
          imageProps={{ height: 1000 }}
          headerContainerStyle={{ marginTop: 30 }}
          progressContainerStyle={{ marginTop: 30 }}
          imageOverlayView={
            <SafeAreaView
              style={{
                backgroundColor: "#00000000",
                zIndex: 10,
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <FontAwesome
                name="arrow-circle-right"
                size={28}
                color="white"
                style={{ padding: 15, opacity: 0.8, marginTop: "33%" }}
              />
            </SafeAreaView>
          }
          // ...
        />
        {/* <Pressable onPress={setStories}>{<Text>KLICK</Text>}</Pressable> */}
      </View>
      <View style={styles.separator} />
      <Text style={styles.subTitle}>Laufende Serien:</Text>

      <ScrollView
        style={styles.scrollView}
        bounces={true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={32}
      >
        {globalObject.shows
          .filter((s: Show) => s.running)
          .map((show: Show) => (
            <View key={show.showId}>
              <TouchableOpacity
                // delayPressIn={0}
                style={{ marginBottom: 10 }}
                onPress={() => {
                  navigation.navigate("ShowDetail", { show });
                }}
              >
                <ShowBox show={show} displayedSeason={getLatestSeason(show)} />
              </TouchableOpacity>
            </View>
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
  storyCoverContainer: {
    flex: 1,
    zIndex: -10,
  },
  storyCoverImage: {
    flex: 1,
  },
  storyCoverContentContainer: {
    flex: 2,
    backgroundColor: "#ff0066",
    padding: 20,
  },
  storyCoverSubtitle: {
    color: "white",
    fontFamily: "Arial",
    fontSize: 23,
  },
  storyCoverTitle: {
    color: "white",
    fontFamily: "Arial",
    fontSize: 36,
    marginTop: 5,
    fontWeight: "bold",
  },
  storyCoverSourceContainer: {
    backgroundColor: "#00000000",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1,
  },
  storyCoverSourceLogo: {
    height: 50,
    width: 150,
    resizeMode: "contain",
    backgroundColor: '#ff0066',
    padding: 15,
    borderRadius: 10
  },
  storySlideHeader: {
    backgroundColor: '#ff0066',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 20
  },
  storySlideContentContainer: {
    backgroundColor: 'white',
    flex: 4,
    padding: 20
  },
  storySlideBulletPointContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: '#00000000',
    
  },
  storySlideBulletPointText: {
    fontSize: 24,
    color: 'black',
    paddingLeft: 10,
    flexWrap: 'wrap',
    flexShrink: 1,
    fontFamily: 'Arial'
  },

});
