import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { Entypo } from '@expo/vector-icons';
import colors from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { setSavedItems } from "../store/savedItemsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from 'react-native';
import axios from 'axios';
import * as Speech from 'expo-speech';

export default TranslationResult = props => {
    const searchPhotos = async (query) => {

        try {
            const response = await axios.get('https://api.unsplash.com/search/photos?page=1&query=' + query + '&client_id=QsjawRcx1O6uL1JZXT0cgNdGLqo95w8kZuj2i4gNnm0');
            const photos = response.data.results.map((result) => result.urls.regular);
            return photos;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    const dispatch = useDispatch();

    const [expandedItems, setExpandedItems] = useState([]);
    const { itemId } = props;
    const item = useSelector(state => {
        return state.history.items.find(item => item.id === itemId) || state.savedItems.items.find(item => item.id === itemId)
    });
    const savedItems = useSelector(state => state.savedItems.items);
    const isSaved = savedItems.some(i => i.id === itemId);
    const starIcon = isSaved ? 'star' : 'star-outlined';

    const starItem = useCallback(async () => {
        let newSavedItems;

        if (isSaved) {
            newSavedItems = savedItems.filter(i => i.id !== itemId);
        }
        else {
            newSavedItems = savedItems.slice();
            newSavedItems.push(item);
        }

        await AsyncStorage.setItem('savedItems', JSON.stringify(newSavedItems));

        dispatch(setSavedItems({ items: newSavedItems }));
    }, [dispatch, savedItems]);

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
    const expandedItem = expandedItems.find((i) => i.id === item.id);
    const isExpanded = expandedItem !== undefined;

    const speakOriginalText = () => {
        Speech.speak(item.original_text, { language: item.from });
    };

    const speakTranslatedText = () => {
        Speech.speak(item.translated_text[item.to], { language: item.to });
    };

    return <TouchableOpacity onPress={() => toggleExpand(item.id)}>
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={speakOriginalText}>
                        <Entypo name="controller-play" size={24} color={colors.subTextColor} />
                    </TouchableOpacity>
                    <Text
                        numberOfLines={4}
                        style={styles.title}>{item.original_text}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={speakTranslatedText}>
                        <Entypo name="controller-play" size={24} color={colors.subTextColor} />
                    </TouchableOpacity>
                    <Text
                        numberOfLines={4}
                        style={styles.subTitle}>{item.translated_text[item.to]}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.iconContainer} onPress={starItem}>
                <Entypo name={starIcon} size={24} color={colors.subTextColor} />
            </TouchableOpacity>
        </View>
        {isExpanded && (
            <View style={styles.expandedContent}>
                
                <View style={styles.buttonContainer}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
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
                    </View>
                    <Image
                    key={expandedItem.photos[expandedItem.currentPhotoIndex]}
                    source={{ uri: expandedItem.photos[expandedItem.currentPhotoIndex] }}
                    style={styles.photo}
                />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
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
            </View>
        )}
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: 'row',
        borderColor: colors.lightGrey,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderTopWidth: 0
    },
    textContainer: {
        flex: 1,
        marginRight: 8
    },
    title: {
        fontFamily: 'nunito-bold',
        letterSpacing: 0.3,
        color: colors.textColor
    },
    subTitle: {
        fontFamily: 'nunito-regular',
        letterSpacing: 0.3,
        color: colors.subTextColor,
        fontSize: 13
    },
    iconContainer: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
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
        alignItems: "center",
        marginVertical: 5,
    },
    buttonText: {
        fontSize: 30,
        fontWeight: "bold",
    },
})