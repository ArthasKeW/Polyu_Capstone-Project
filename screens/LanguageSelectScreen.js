import React, { useCallback } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import LanguageItem from '../components/LanguageItem';
import { globalStyles } from '../styles/global';
import supportedLanguages from '../utils/supportedLanguages';

export default function LanguageSelectScreen({ navigation }) {
    const selected = navigation.getParam("selected");
    const mode = navigation.getParam('mode');
    const onLanguageSelect = useCallback( itemKey => {
        const dataKey = mode === 'to' ? 'languageTo' : 'languageFrom';
        navigation.navigate("TranslatorScreen", {[dataKey]: itemKey});
    }, [navigation]);
    return (

        <View style={globalStyles.container}>
            <FlatList
                data={Object.keys(supportedLanguages)}
                keyExtractor={item => item}
                renderItem={({ item }) => {
                    const languageKey = item;
                    const languageString = supportedLanguages[languageKey];
                    return <LanguageItem 
                                onPress={() => onLanguageSelect(languageKey)}
                                text={languageString}
                                selected={languageKey === selected}
                                />
                }}
            />

        </View>

    )
}

