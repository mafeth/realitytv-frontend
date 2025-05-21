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
  View,
  Text
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
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
import AntDesign from '@expo/vector-icons/AntDesign';

import styles from "./PersonDetail.styles";

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
          {person.imageUrl ? <Image
            style={[styles.personImage, { width: size, height: size }]}
            source={{ uri: person.imageUrl }}
          /> : <AntDesign name="user" size={size - 30} color="white" />}

        </View>

        <Text
          style={[styles.personName, { fontSize: size / 4.8 }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {size <= 60 ? person.name.split(" ")[0] : person.name + " ("+calculateAge(person.birthDate).toString()+")"}
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
        <PersonBox person={person} size={80} />
      </View>
      <View style={{ backgroundColor: "white", width: 3, height: 20 }}></View>
      <View
        style={{ backgroundColor: "white", width: "100%", height: 3 }}
      ></View>

      <ScrollView
        ref={scrollViewRef}
        style={{flex: 1}}
        // pagingEnabled={show.seasons.length > 0}
        scrollEnabled={participatingSeasons.length > 1}
        
        horizontal={true}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width - 50} // Adjusted to keep everything centered
        snapToAlignment={"center"}
        contentInset={{
          top: 0,
          left: participatingSeasons.length > 1 ? 25 : 0, // Adjusted to keep everything centered
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
                <ShowBox show={getShowById(season.show)} displayedSeason={season} />
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
                          backgroundColor: '#212432'
                        }}
                      >
                        <Text style={{ fontWeight: "bold", fontSize: 18, color: 'white' }}>
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

