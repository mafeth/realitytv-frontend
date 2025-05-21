import { StyleSheet } from "react-native";

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

export default styles;