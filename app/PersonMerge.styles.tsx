import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1b1e2b",
  },
  container: {
    flex: 1,
    backgroundColor: "#292d3e",
  },
  searchContainer: {
    padding: 10,
    backgroundColor: "#1b1e2b",
    borderBottomWidth: 1,
    borderBottomColor: "#3a3f5c",
  },
  searchInput: {
    height: 45,
    backgroundColor: "#292d3e",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#c0caf5",
    borderWidth: 1,
    borderColor: "#4f5677",
  },
  listContainer: {
    flex: 1,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContent: {
    paddingHorizontal: '5%',
    paddingTop: 15,
    paddingBottom: 90, // Space for bottom buttons
  },
  personBox: {
    backgroundColor: "#1b1e2b",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
    minHeight: 70,
    borderWidth: 1,
    borderColor: "#3a3f5c",
  },
  selectedPersonBox: {
    backgroundColor: "#3a3f5c",
    borderColor: "#6d78ad",
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4f5677",
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#4f5677",
  },
  placeholderText: {
    color: '#a9b1d6',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    color: "#c0caf5",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  birthDateText: {
    color: "#a9b1d6",
    fontSize: 13,
  },
  emptyListText: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 16,
    color: '#a9b1d6',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 55,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#1b1e2b', // Solid background
    borderTopWidth: 1,
    borderTopColor: '#3a3f5c',
    minHeight: 70,
    zIndex: 1,
  },
  bottomButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  mergeButton: {
    backgroundColor: '#7aa2f7', // Blue
  },
  deselectButton: {
    backgroundColor: '#f7768e', // Reddish
  },
  bottomButtonText: {
    color: '#1a1b26', // Dark text
    fontSize: 15,
    fontWeight: 'bold',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // Position modal at the bottom
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '100%',
    maxHeight: '75%', // Limit modal height
    backgroundColor: '#292d3e', // Dark background for modal
    borderTopLeftRadius: 20, // Rounded top corners
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30, // Extra padding at bottom for buttons
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 }, // Shadow on top edge
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18, // Slightly smaller title
    fontWeight: 'bold',
    color: '#c0caf5',
    marginBottom: 20, // More space below title
    textAlign: 'center',
  },
  modalScrollView: {
    marginBottom: 15, // Space before action buttons
  },
  modalCategory: {
    marginBottom: 20, // Space between categories
  },
  modalCategoryTitle: {
    fontSize: 16,
    fontWeight: '600', // Semi-bold
    color: '#a9b1d6', // Lighter text for title
    marginBottom: 10, // Space below category title
    borderBottomWidth: 1,
    borderBottomColor: '#4f5677',
    paddingBottom: 5,
  },
  modalOptionsContainer: {
    flexDirection: 'row', // Arrange options horizontally
    flexWrap: 'wrap', // Allow wrapping to next line
    gap: 8, // Space between options
  },
  modalImageOptionsContainer: {
    justifyContent: 'flex-start', // Align images to the start
  },
  modalOption: {
    backgroundColor: '#4f5677', // Default background for options
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15, // More rounded options
    borderWidth: 2,
    borderColor: 'transparent', // No border by default
  },
  modalOptionSelected: {
    borderColor: '#7aa2f7', // Blue border for selected option
    backgroundColor: '#3a3f5c', // Slightly different background when selected
  },
  modalOptionText: {
    color: '#c0caf5', // Light text for options
    fontSize: 14,
  },
  modalImageOption: {
    borderWidth: 3, // Thicker border for image selection visual
    borderColor: 'transparent',
    borderRadius: 10, // Rounded corners for image container
    marginRight: 10, // Space between images
    marginBottom: 10,
    overflow: 'hidden', // Clip image to border radius
    backgroundColor: '#4f5677', // Background for placeholder
  },
  modalOptionImage: {
    width: 60,
    height: 60,
    borderRadius: 7, // Slightly less than container to show border
  },
  modalOptionImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space out buttons
    // marginTop: 10, // Space above buttons
    width: '100%',
    // backgroundColor: 'red',
    height: 50
  },
  modalActionButton: {
    flex: 1, // Take equal width
    padding: 10, 
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 5,
  },
  modalActionButtonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    height: '100%',
    textAlign: 'center'

  },
  modalConfirmButton: {
    backgroundColor: '#73daca', // Teal color for confirm
  },
  modalCancelButton: {
    backgroundColor: '#f7768e', // Reddish color for cancel
  },
});

export default styles;
