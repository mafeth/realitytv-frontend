import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 0,
    backgroundColor: '#292d3e'
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
    // backgroundColor: "gray",
    margin: 5,
  },
  personImage: {
    width: 80,
    height: 80,
    borderRadius: 200,
    backgroundColor: '#212432',
    justifyContent: 'center',
    alignItems: 'center'
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


export default styles;