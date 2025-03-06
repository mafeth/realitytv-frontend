import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useNavigation } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useEffect, useState, useRef } from "react";
import Colors from "@/constants/Colors";
import GenreTag from "@/components/GenreTag";
import ShowBox from "@/components/ShowBox";
import { useColorScheme } from "@/components/useColorScheme";
import { Person, Show } from "@/app/types";
import { useRoute } from "@react-navigation/native";

export default function PersonDetail() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const route = useRoute();
  const { person } = route.params as { person: Person };
  const { show } = route.params as { show: Show };
  const width = Dimensions.get("window").width;

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: (width - 50) * 1, animated: false }); // Scroll to the middle item
    }
  }, [scrollViewRef.current]);

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

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: person.name + ' aus "' + show.title + '"' || "Person",
          headerBackTitle: "Show",
          headerTintColor: Colors[colorScheme ?? "light"].text,
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
          },
          headerShown: true,
        }}
      />

      <View style={styles.header}>
        <View style={styles.personContainer}>
          <Image style={styles.personImage} source={{ uri: person.imageUrl }} />
          <Text style={styles.personName}>
            {person.name} ({calculateAge(person.birthDate)})
          </Text>
        </View>
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
        <View style={styles.view}>
        <View style={{ backgroundColor: "white", width: 3, height: 20 }}></View>
        <Text style={styles.yearLabel}>2023</Text>
          <ShowBox show={show} />
        </View>
        <View style={styles.view}>
        <View style={{ backgroundColor: "white", width: 3, height: 20 }}></View>
        <Text style={styles.yearLabel}>2024</Text>
          <ShowBox show={show} />
        </View>
        <View style={styles.view}>
        <View style={{ backgroundColor: "white", width: 3, height: 20 }}></View>
        <Text style={styles.yearLabel}>2025</Text>
          <ShowBox show={show} />
        </View>
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
});
