import { Ionicons } from "@expo/vector-icons";
import { Text, TextProps } from "./Themed";
import { StyleSheet, View, TouchableOpacity } from "react-native";

export default function SeasonButton(props: TextProps) {
  return (
    
    <TouchableOpacity style={styles.container}>
      <Text {...props} style={[props.style, styles.text]} />
      <Ionicons name="chevron-forward" size={24} color="#fff" />
    </TouchableOpacity>
  );
  //   return <Text {...props} style={[props.style, styles.genreTag]} />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1b1e2b",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
  },
  text: {
    color: "#fff",
    textAlign: "left",
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
  },
});
