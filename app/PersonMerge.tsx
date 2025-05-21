import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  Modal,
  // Button, // Using TouchableOpacity for modal buttons now
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  ScrollView, // Import ScrollView for modal content
} from "react-native";
import { useEffect, useState, useContext, useRef, useCallback } from "react";

import React from "react";

import EditScreenInfo from "@/components/EditScreenInfo";
import { useNavigation } from "@react-navigation/native";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";
import GenreTag from "@/components/GenreTag";
import ShowBox from "@/components/ShowBox";
import { useColorScheme } from "@/components/useColorScheme";
import { Person, Season, Show } from "@/app/types"; // Assuming these types are defined correctly
import { useRoute } from "@react-navigation/native";
import { GlobalContext } from "@/app/GlobalContext"; // Assuming this context is set up
import Entypo from '@expo/vector-icons/Entypo';
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { ListRenderItemInfo } from "react-native";

import styles from "./PersonMerge.styles";

// Define a basic Person type if not imported
interface PersonItem {
  personId: number;
  name: string;
  birthDate: string;
  imageUrl: string | null;
}

// Type for the data selected in the modal for the final merged person
// Using Partial because initially it might be empty or partially filled
type MergedDataType = Partial<PersonItem>;

// API Base URL (adjust if needed)
const API_BASE_URL = "http://192.168.178.42:8080";

export default function PersonDetail() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const route = useRoute();

  // --- Context Handling ---
  // ... (context code remains the same) ...

  const [persons, setPersons] = useState<PersonItem[]>([]);
  const [selectedPersons, setSelectedPersons] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const ITEM_HEIGHT = 50;

  // State to hold the full details of the persons selected for merging
  const [detailedSelectedPersons, setDetailedSelectedPersons] = useState<PersonItem[]>([]);
  // State to hold the chosen properties for the final merged person
  const [mergedData, setMergedData] = useState<MergedDataType>({});
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [personToEdit, setPersonToEdit] = useState<PersonItem | null>(null);

  // --- Fetch Persons Function ---
  const fetchPersons = useCallback(async (query: string) => {
    setIsLoading(true);
    let url = `${API_BASE_URL}/persons`;
    if (query) {
      url = `${API_BASE_URL}/persons/search?q=${encodeURIComponent(query)}`;
    }
    console.log("Fetching from:", url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      const data = await response.json();
      setPersons(data);
    } catch (error) {
      console.error("Error fetching persons:", error);
      setPersons([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // --- Debounced Search Handler ---
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      fetchPersons(text);
    }, 500);
  };

  const handleSaveEdit = async () => {
    if (!personToEdit) return;
    try {
      const response = await fetch(
        `${API_BASE_URL}/persons/${personToEdit.personId}`,
        {
          method: 'PUT', // oder PATCH, je nach API
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: personToEdit.name,
            birthDate: personToEdit.birthDate,
            imageUrl: personToEdit.imageUrl,
          }),
        }
      );
      if (!response.ok) throw new Error('Update fehlgeschlagen');
      // Liste neu laden oder lokalen State updaten:
      await fetchPersons(searchQuery);
      setIsEditModalVisible(false);
      setPersonToEdit(null);
    } catch (err) {
      console.error(err);
      // hier könntest du noch eine Fehlermeldung anzeigen
    }
  };

  // --- Initial Fetch on Mount ---
  useEffect(() => {
    fetchPersons("");
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [fetchPersons]);

  // --- Toggle Selection ---
  
  const toggleSelection = (personId: number) => {

    setSelectedPersons((prevSelected) =>
      prevSelected.includes(personId)
        ? prevSelected.filter((id) => id !== personId)
        : [...prevSelected, personId]
    );


  };

  const editPerson = (person: PersonItem) => {
    if ( selectedPersons.length > 0) {
      // wie gehabt: Merge-Selection
      toggleSelection(person.personId);
    } else {
      // Einzel-Edit: Person finden und Modal öffnen
      if (person) {
        setPersonToEdit(person);
        setIsEditModalVisible(true);
      }
    }
  };

  // --- Deselect All ---
  const deselectAll = () => {
    setSelectedPersons([]);
  };

  // --- Calculate Age ---
  function calculateAge(birthDate: string): number | string {
    if (!birthDate) return '?';
    const birth = new Date(birthDate);
    if (isNaN(birth.getTime())) return '?';
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age >= 0 ? age : '?';
  }

  const PersonBox = React.memo<{ item: PersonItem; isSelected: boolean; onPress: () => void }>(
    ({ item, isSelected, onPress }) => (
      <TouchableOpacity
        style={[styles.personBox, isSelected && styles.selectedPersonBox]}
        onLongPress={onPress}
        onPress={() => editPerson(item)}
        activeOpacity={0.7}
      >
        <View style={styles.imageContainer}>
          {item.imageUrl ? (
            <Image
              style={styles.image}
              source={{ uri: item.imageUrl }}
              onError={(e) => console.log("Failed to load image:", e.nativeEvent.error)}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderText}>?</Text>
            </View>
          )}
        </View>
        {/* Text Container */}
        <View style={styles.textContainer}>
          <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
            {item.name} ({calculateAge(item.birthDate)})
          </Text>
          <Text style={styles.birthDateText}>
            Geburtsdatum: {item.birthDate || 'N/A'}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    (prev, next) =>
      prev.isSelected === next.isSelected && prev.item === next.item
  );

  // --- Render Person Item ---
  const renderPersonMemo = useCallback(
    ({ item }: ListRenderItemInfo<PersonItem>) => (
      <PersonBox
        item={item}
        isSelected={selectedPersons.includes(item.personId)}
        onPress={() => toggleSelection(item.personId)}
      />
    ),
    [selectedPersons] // nur neu erzeugen, wenn sich Auswahl wirklich ändert
  );

  // --- Modal Handlers ---
  const openModal = () => {
    // Find the full PersonItem objects for the selected IDs
    const details = persons.filter(p => selectedPersons.includes(p.personId));
    setDetailedSelectedPersons(details);

    // Initialize mergedData with the properties of the first selected person
    if (details.length > 0) {
      setMergedData({
        personId: details[0].personId,
        name: details[0].name,
        birthDate: details[0].birthDate,
        imageUrl: details[0].imageUrl,
      });
    } else {
      setMergedData({}); // Reset if somehow no details found
    }

    console.log("Opening modal with details:", details);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    // Optionally reset detailedSelectedPersons and mergedData if needed
    // setDetailedSelectedPersons([]);
    // setMergedData({});
  };

  // --- Handle Selection within Modal ---
  const handlePropertySelect = (category: keyof MergedDataType, value: any) => {
    setMergedData(prev => ({
      ...prev,
      [category]: value,
    }));
  };

  // --- Handle Final Merge Action ---
  const handleConfirmMerge = () => {
    console.log("Confirming merge with data:", mergedData);
    setSelectedPersons([]); // Clear selection after confirming
    setDetailedSelectedPersons([]); // Clear detailed persons
    setMergedData({}); // Reset merged data
    closeModal(); // Close modal
    // --- TODO: Implement API call to merge persons here ---
    // Example:
    // try {
    //   const response = await fetch(`${API_BASE_URL}/persons/merge`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         idsToMerge: selectedPersons, // Send original IDs
    //         finalData: mergedData // Send the chosen data
    //     })
    //   });
    //   if (!response.ok) { throw new Error('Merge failed'); }
    //   // Handle success: Close modal, refresh list, show success message
    //   closeModal();
    //   fetchPersons(""); // Refresh the list
    //   setSelectedPersons([]); // Clear selection
    // } catch (error) {
    //   console.error("Merge failed:", error);
    //   // Show error message to user
    // }
    // --- End TODO ---

    closeModal(); // Close modal after logging for now
  };

  // --- Component Return ---
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Stack.Screen options={{ title: "Personen auswählen" }} />

          {/* Search Input */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Person suchen..."
              placeholderTextColor="#a9b1d6"
              value={searchQuery}
              onChangeText={handleSearchChange}
              clearButtonMode="while-editing"
            />
          </View>

          {/* List or Loading/Empty Indicator */}
          <View style={styles.listContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#c0caf5" style={styles.loadingIndicator} />
            ) : (
              <FlatList
                data={persons}
                keyExtractor={item => item.personId.toString()}
                renderItem={renderPersonMemo}           // Memoisierte Item-Komponente
                extraData={selectedPersons}             // Beobachte Auswahl-Änderungen
                initialNumToRender={20}                 // Nicht alles auf einmal
                maxToRenderPerBatch={10}                // Stückweise nachladen
                windowSize={5}                          // Wie viele Bildschirme extra
                removeClippedSubviews                   // Unnötige off-screen Items rausschmeißen
                getItemLayout={(_, index) => ({
                  length: ITEM_HEIGHT,                  // z.B. 70
                  offset: ITEM_HEIGHT * index,
                  index
                })}
                keyboardShouldPersistTaps="handled"
                onScrollBeginDrag={Keyboard.dismiss}
              />
            )}
          </View>

          {/* Button Container */}
          {selectedPersons.length > 0 && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.bottomButton, styles.deselectButton]} onPress={deselectAll} activeOpacity={0.8}>
                <Text style={styles.bottomButtonText}>Aufheben</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.bottomButton, styles.mergeButton]} onPress={openModal} activeOpacity={0.8}>
                <Text style={styles.bottomButtonText}>Zusammenfügen ({selectedPersons.length})</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Merge Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Daten für Zusammenführung auswählen</Text>
                <ScrollView style={styles.modalScrollView}>
                  {/* ID Section */}
                  <View style={styles.modalCategory}>
                    <Text style={styles.modalCategoryTitle}>ID</Text>
                    <View style={styles.modalOptionsContainer}>
                      {detailedSelectedPersons.map(p => (
                        <TouchableOpacity
                          key={`id-${p.personId}`}
                          style={[
                            styles.modalOption,
                            mergedData.personId === p.personId && styles.modalOptionSelected
                          ]}
                          onPress={() => handlePropertySelect('personId', p.personId)}
                        >
                          <Text style={styles.modalOptionText}>{p.personId}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Name Section */}
                  <View style={styles.modalCategory}>
                    <Text style={styles.modalCategoryTitle}>Name</Text>
                    <View style={styles.modalOptionsContainer}>
                      {detailedSelectedPersons.map(p => (
                        <TouchableOpacity
                          key={`name-${p.personId}`}
                          style={[
                            styles.modalOption,
                            mergedData.name === p.name && styles.modalOptionSelected
                          ]}
                          onPress={() => handlePropertySelect('name', p.name)}
                        >
                          <Text style={styles.modalOptionText}>{p.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Birthday Section */}
                  <View style={styles.modalCategory}>
                    <Text style={styles.modalCategoryTitle}>Geburtstag</Text>
                    <View style={styles.modalOptionsContainer}>
                      {detailedSelectedPersons.map(p => (
                        <TouchableOpacity
                          key={`bday-${p.personId}`}
                          style={[
                            styles.modalOption,
                            mergedData.birthDate === p.birthDate && styles.modalOptionSelected
                          ]}
                          onPress={() => handlePropertySelect('birthDate', p.birthDate)}
                        >
                          <Text style={styles.modalOptionText}>{p.birthDate || 'N/A'}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Image Section */}
                  <View style={styles.modalCategory}>
                    <Text style={styles.modalCategoryTitle}>Bild</Text>
                    <View style={[styles.modalOptionsContainer, styles.modalImageOptionsContainer]}>
                      {detailedSelectedPersons.map(p => (
                        <TouchableOpacity
                          key={`img-${p.personId}`}
                          style={[
                            styles.modalImageOption,
                            mergedData.imageUrl === p.imageUrl && styles.modalOptionSelected // Reuse selected style for border
                          ]}
                          onPress={() => handlePropertySelect('imageUrl', p.imageUrl)}
                        >
                          {p.imageUrl ? (
                            <Image source={{ uri: p.imageUrl }} style={styles.modalOptionImage} />
                          ) : (
                            <View style={styles.modalOptionImagePlaceholder}>
                              <Text style={styles.placeholderText}>?</Text>
                            </View>
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </ScrollView>

                {/* Modal Action Buttons */}
                <View style={styles.modalActionContainer}>
                  <TouchableOpacity
                    style={[styles.modalActionButton, styles.modalCancelButton]}
                    onPress={closeModal}
                  >
                    <Text style={styles.modalActionButtonText}>Abbrechen</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalActionButton, styles.modalConfirmButton]}
                    onPress={handleConfirmMerge} // Call the merge handler
                  >
                    <Text style={styles.modalActionButtonText}>Bestätigen</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* Edit Modal */}

          <Modal
            animationType="slide"
            transparent
            visible={isEditModalVisible}
            onRequestClose={() => setIsEditModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Person bearbeiten</Text>
                <ScrollView style={styles.modalScrollView}>
                  {/* Name */}
                  <View style={styles.modalCategory}>
                    <Text style={styles.modalCategoryTitle}>Name</Text>
                    <TextInput
                      style={styles.searchInput}
                      value={personToEdit?.name || ''}
                      onChangeText={text =>
                        setPersonToEdit(prev => prev && { ...prev, name: text })
                      }
                      placeholder="Name eingeben"
                      placeholderTextColor="#a9b1d6"
                    />
                  </View>
                  {/* Bild-URL */}
                  <View style={styles.modalCategory}>
                    <Text style={styles.modalCategoryTitle}>Bild URL</Text>
                    <TextInput
                      style={styles.searchInput}
                      value={personToEdit?.imageUrl || ''}
                      onChangeText={text =>
                        setPersonToEdit(prev => prev && { ...prev, imageUrl: text })
                      }
                      placeholder="https://..."
                      placeholderTextColor="#a9b1d6"
                    />
                  </View>
                  {/* Geburtsdatum */}
                  <View style={styles.modalCategory}>
                    <Text style={styles.modalCategoryTitle}>Geburtsdatum</Text>
                    <TextInput
                      style={styles.searchInput}
                      value={personToEdit?.birthDate || ''}
                      onChangeText={text =>
                        setPersonToEdit(prev => prev && { ...prev, birthDate: text })
                      }
                      placeholder="YYYY-MM-DD"
                      placeholderTextColor="#a9b1d6"
                    />
                  </View>
                </ScrollView>
                <View style={styles.modalActionContainer}>
                  <TouchableOpacity
                    style={[styles.modalActionButton, styles.modalCancelButton]}
                    onPress={() => {
                      setIsEditModalVisible(false);
                      setPersonToEdit(null);
                    }}
                  >
                    <Text style={styles.modalActionButtonText}>Abbrechen</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalActionButton, styles.modalConfirmButton]}
                    onPress={handleSaveEdit}
                  >
                    <Text style={styles.modalActionButtonText}>Speichern</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
