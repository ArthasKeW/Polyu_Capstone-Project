import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import TranslationResult from '../components/TranslationResult';
import { globalStyles } from '../styles/global';
import colors from '../utils/colors';
import axios from 'axios';
import {Image} from 'react-native' ; 

export default function Home({ navigation }) {
    const searchPhotos = async (query) => {

        try {
          const response = await axios.get('https://api.unsplash.com/search/photos?page=1&query='+query+'&client_id=QsjawRcx1O6uL1JZXT0cgNdGLqo95w8kZuj2i4gNnm0');
          const photos = response.data.results.map((result) => result.urls.regular);
          return photos;
        } catch (error) {
          console.error(error);
          return [];
        }
      };

  const savedItems = useSelector(state => state.savedItems.items);

  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpand = async (itemId) => {
    const expandedIndex = expandedItems.findIndex((item) => item.id === itemId);
  
    if (expandedIndex >= 0) {
      // Item is already expanded, so collapse it
      setExpandedItems(expandedItems.filter((item) => item.id !== itemId));
    } else {
      // Item is not expanded, so expand it
      const item = savedItems.find((item) => item.id === itemId);
      const photos = await searchPhotos(item.original_text);
  
      setExpandedItems([
        ...expandedItems,
        {
          id: itemId,
          photos,
          currentPhotoIndex: 0, // add currentPhotoIndex property
        },
      ]);
    }
  };
  

  

const renderItem = ({ item }) => {
    const expandedItem = expandedItems.find((i) => i.id === item.id);
    const isExpanded = expandedItem !== undefined;
    
    return (
      <TouchableOpacity onPress={() => toggleExpand(item.id)}>
        <TranslationResult itemId={item.id} />
        {isExpanded && (
          <View style={styles.expandedContent}>
            <Image
              key={expandedItem.photos[expandedItem.currentPhotoIndex]}
              source={{ uri: expandedItem.photos[expandedItem.currentPhotoIndex] }}
              style={styles.photo}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() =>
                  setExpandedItems(
                    expandedItems.map((i) =>
                      i.id === item.id
                        ? {
                            ...i,
                            currentPhotoIndex:
                              (i.currentPhotoIndex - 1 + i.photos.length) % i.photos.length, // go to previous photo
                          }
                        : i
                    )
                  )
                }
              >
                <Text style={styles.buttonText}>{"<"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  setExpandedItems(
                    expandedItems.map((i) =>
                      i.id === item.id
                        ? {
                            ...i,
                            currentPhotoIndex:
                              (i.currentPhotoIndex + 1) % i.photos.length, // go to next photo
                          }
                        : i
                    )
                  )
                }
              >
                <Text style={styles.buttonText}>{">"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  

  if (savedItems.length === 0) {
    return (
      <View style={styles.noItemsContainer}>
        <Text style={styles.noItemText}>No Saved Items</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={savedItems.slice().reverse()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    padding: 10,
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noItemText: {
    fontFamily: 'nunito-regular',
    letterSpacing: 0.3,
  },
  expandedContent: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  photo: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
