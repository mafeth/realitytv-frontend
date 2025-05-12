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
import Entypo from '@expo/vector-icons/Entypo';

export default function PersonDetail() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const route = useRoute();

  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error(
      "GlobalContext muss innerhalb eines GlobalProvider verwendet werden"
    );
  }

  const { globalObject } = context;

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
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PersonMerge")}>
        <Entypo name="merge" size={16} color="white" />
        <Text style={styles.buttonText}>Personen verknüpfen</Text>
      </TouchableOpacity>
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
  buttonText: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
    height: '100%',
  },
  button: { 
    backgroundColor: "#1b1e2b",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
  },



});
