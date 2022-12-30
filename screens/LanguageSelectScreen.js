import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { globalStyles } from '../styles/global';
import supportedLanguages from '../utils/supportedLanguages';

export default function LanguageSelectScreen({ navigation }) {


    return (

        <View style={globalStyles.container}>
            <FlatList
                data={Object.keys(supportedLanguages)}
                keyExtractor={item => item}
                renderItem={({ item }) => {
                    const languageKey = item;
                    const languageString = supportedLanguages[languageKey];
                    return <Text>{languageString}</Text>
                }}
            />

        </View>

    )
}

