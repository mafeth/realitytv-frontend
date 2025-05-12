import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Dialog from "react-native-dialog";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";


export default function TabTwoScreen() {
  const navigation = useNavigation();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordSubmit = async () => {
    try {
      const response = await fetch("http://192.168.178.42:8080/admin/checkPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      if (response.status === 200) {
        setDialogVisible(false);
        navigation.navigate("AdminPanel");
      } else {
        alert("Falsches Passwort");
      }
    } catch (error) {
      alert("Network error");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setDialogVisible(true)}>
        <Text>Admin Bereich</Text>
      </TouchableOpacity>
      {/* React Native Dialog */}
      <Dialog.Container visible={dialogVisible} >
        <Dialog.Title style={{color: 'black'}}>Enter password</Dialog.Title>
        <Dialog.Input
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={{color: 'black'}}
        />
        <Dialog.Button label="Cancel" onPress={() => { setDialogVisible(false); setPassword(""); }} />
        <Dialog.Button label="OK" onPress={handlePasswordSubmit} />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    backgroundColor: "#1b1e2b",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});
