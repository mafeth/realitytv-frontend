import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  PanResponder,
  ActivityIndicator,
  ViewStyle,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useNavigation } from "@react-navigation/native";
import { Stack, useFocusEffect } from "expo-router";
import { useEffect, useState, useRef, useContext, useCallback } from "react";
import Colors from "@/constants/Colors";
import GenreTag from "@/components/GenreTag";
import ShowBox from "@/components/ShowBox";
import { useColorScheme } from "@/components/useColorScheme";
import { Person, Season, Show } from "@/app/types";
import { useRoute } from "@react-navigation/native";
import { GlobalContext } from "@/app/GlobalContext";

export default function PersonDetail() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const route = useRoute();
  const { person } = route.params as { person: Person };
  const { show } = route.params as { show: Show };
  // const { season } = route.params as { season: Season };

  const width = Dimensions.get("window").width;

  const scrollViewRef = useRef<ScrollView>(null);
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error(
      "GlobalContext muss innerhalb eines GlobalProvider verwendet werden"
    );
  }

  const { globalObject } = context;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [participatingSeasons, setParticipatingSeasons] = useState<Season[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchParticipatingSeasons = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `http://192.168.178.42:8080/persons/${person.personId}/seasons`
          );
          const data: Season[] = await response.json();
          setParticipatingSeasons(data);
          setLoading(false);
        } catch (error) {
          console.error("Fehler beim Laden der Seasons:", error);
        }
      };
      fetchParticipatingSeasons();
    }, [person.personId])
  );

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

  function getShowById(showId: number): Show {
    return globalObject.shows.find((s: Show) => s.showId === showId);
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        // Wenn die vertikale Verschiebung größer als 50 ist, schließen wir das Modal
        if (Math.abs(gestureState.dy) > 50) {
          closeModal();
        }
      },
    })
  ).current;

  const closeModal = () => setModalVisible(false);

  const handleLongPress = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const PersonBox = ({
    person,
    size,
    boxStyle,
    refShow
  }: {
    person: Person;
    size: number;
    boxStyle?: ViewStyle;
    refShow?: Show;
  }) => {
    return (
      <TouchableOpacity
        style={[styles.personContainer, boxStyle]}
        key={person.personId}
        onPress={() =>
          navigation.navigate("PersonDetail", { person, refShow })
        }
        onLongPress={() => handleLongPress(person.imageUrl)}
      >
        <View style={[styles.personImage, { width: size, height: size }]}>
          <Image
            style={[styles.personImage, { width: size, height: size }]}
            source={{ uri: person.imageUrl }}
          />
        </View>
        
        <Text
          style={[styles.personName, { fontSize: size / 4.8 }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {person.name.split(" ")[0]} ({calculateAge(person.birthDate)})
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer} {...panResponder.panHandlers}>
          <TouchableOpacity style={styles.modalCloseArea} onPress={closeModal}>
            <Image style={styles.fullImage} source={{ uri: selectedImage }} />
          </TouchableOpacity>
        </View>
      </Modal>

      <Stack.Screen
        options={{
          title: show ? `${person.name} aus "${show.title}"` : person.name,
          headerBackTitle: "Show",
          headerTintColor: Colors[colorScheme ?? "light"].text,
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
          },
          headerShown: true,
        }}
      />

      <View style={styles.header}>
        <PersonBox person={person} size={125} />
      </View>
      <View style={{ backgroundColor: "white", width: 3, height: 20 }}></View>
      <View
        style={{ backgroundColor: "white", width: "100%", height: 3 }}
      ></View>

      <ScrollView
        ref={scrollViewRef}
        style={{}}
        horizontal={true}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width - 50} // Adjusted to keep everything centered
        snapToAlignment={"center"}
        contentInset={{
          top: 0,
          left: 25, // Adjusted to keep everything centered
          bottom: 0,
          right: 25, // Adjusted to keep everything centered
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#aac0ce" />
        ) : (
          participatingSeasons
            .sort(
              (a: Season, b: Season) =>
                new Date(a.startDate).getTime() -
                new Date(b.startDate).getTime()
            )
            .map((season: Season) => (
              <View style={styles.view} key={season.seasonId}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 91,
                  }}
                >
                  <PersonBox person={person} size={60} refShow={show} />
                  <View
                    style={{ backgroundColor: "white", width: 20, height: 3 }}
                  ></View>
                  <View
                    style={{
                      backgroundColor: "white",
                      width: 3,
                      height: 90,
                      alignSelf: "flex-start",
                    }}
                  ></View>
                </View>
                <Text style={styles.yearLabel}>
                  {new Date(season.startDate).getFullYear()}
                </Text>
                <ShowBox show={getShowById(season.show)} displayedSeason={season}/>
                <View
                  style={{ backgroundColor: "white", width: 3, height: 20 }}
                ></View>
                <View style={styles.participantsBox}>
                  <Text
                    style={{
                      alignSelf: "flex-start",
                      paddingLeft: 10,
                      marginBottom: 5,
                      color: "#aac0ce",
                    }}
                  >
                    Weitere Teilnehmer:
                  </Text>

                  <View style={styles.participantBoxContent}>
                    {season.participants
                      .filter(
                        (participant) =>
                          participant.personId !== person.personId
                      )
                      .slice(0, 7)
                      .map((participant) => (
                        <PersonBox
                          person={participant}
                          size={60}
                          key={participant.personId}
                          boxStyle={{ width: "20%" }}
                          refShow={getShowById(season.show)}
                        />
                      ))}

                    <TouchableOpacity
                      style={[styles.personContainer, { width: "20%" }]}
                      onPress={() =>
                        navigation.navigate("ShowDetail", { show: getShowById(season.show) })
                      }
                    >
                      <View
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 100,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                          +{season.participants.length - 8}
                        </Text>
                      </View>

                      <Text style={[styles.personName, { fontSize: 60 / 4.8 }]}>
                        mehr
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    // padding: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  header: {
    width: "100%",
    // height: 200,
    // backgroundColor: "rgba(84, 180, 20, 0.62)",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
  },
  yearLabel: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    margin: 3,
  },
  personContainer: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#00000000",
    margin: 5,
  },
  personImage: {
    width: 125,
    height: 125,
    borderRadius: 200,
  },
  personName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  view: {
    // backgroundColor: 'blue',
    width: Dimensions.get("window").width - 60,
    marginHorizontal: 5, // Changed from 10 to 5

    // height: 200,
    // borderRadius: 10,
    //paddingHorizontal : 30
    alignItems: "center",
  },
  participantsBox: {
    width: "100%",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#1c1c2b",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  participantBoxContent: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    // alignItems: 'baseline',
    // gap: 10,
    flexWrap: "wrap",
    borderRadius: 5,
    backgroundColor: "#00000000",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseArea: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    resizeMode: "contain",
  },
});
