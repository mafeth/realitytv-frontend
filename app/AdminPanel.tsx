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

import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import styles from "./AdminPanel.styles";

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
    <GestureHandlerRootView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PersonMerge")}>
          <Entypo name="merge" size={16} color="white" />
          <Text style={styles.buttonText}>Personen verknüpfen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Updates")}>
          <Entypo name="ccw" size={16} color="white" />
          <Text style={styles.buttonText}>Updates</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

