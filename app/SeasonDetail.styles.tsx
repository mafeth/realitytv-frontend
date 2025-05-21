import { StyleSheet } from "react-native";

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


export default styles;