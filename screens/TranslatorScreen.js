import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, TextInput, ActivityIndicator, FlatList } from 'react-native';
import { globalStyles } from '../styles/global';
import {  Ionicons, MaterialIcons } from '@expo/vector-icons';
import colors from '../utils/colors';
import supportedLanguages from '../utils/supportedLanguages';
import axios from 'axios';
import { translate } from '../utils/translate';
import * as Clipboard from 'expo-clipboard';
import {useDispatch, useSelector} from 'react-redux';
import { addHistoryItem, setHistoryItems } from '../store/historySlice';
import TranslationResult from '../components/TranslationResult';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setSavedItems } from '../store/savedItemsSlice';


const loadData = () => {
    return async dispatch => {
        try {
            const historyString = await AsyncStorage.getItem('history');
            if(historyString !== null){
                const history = JSON.parse(historyString);
                dispatch(setHistoryItems({items:history}));
            }

            const savedItemsString = await AsyncStorage.getItem('savedItems');
            if(savedItemsString !== null){
                const savedItems = JSON.parse(savedItemsString);
                dispatch(setSavedItems({items:savedItems}));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default function TranslatorScreen({ navigation }) {
    const dispatch = useDispatch();
    const history = useSelector(state => state.history.items);

    const savedButtonHandler = () => {
        navigation.navigate('TranslatorScreen_Saved')
    }
    const settingButtonHandler = () => {
        navigation.navigate('TranslatorScreen_Setting')
    }
    const [enteredText, setEnteredText] = useState("");
    const [resultText, setResultText] = useState("");
    const [languageTo, setLanguageTo] = useState("zh-TW");
    const [languageFrom, setLanguageFrom] = useState("en");
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        if (typeof navigation.getParam("languageTo") !== "undefined") {
            setLanguageTo(navigation.getParam("languageTo"));
        }
        if (typeof navigation.getParam("languageFrom") !== "undefined") {
            setLanguageFrom(navigation.getParam("languageFrom"));
        }

    }, [navigation]);

    useEffect(()=>{
        dispatch(loadData());
    },[dispatch])

    useEffect(()=> {
        const saveHistory = async () => {
            try {
                await AsyncStorage.setItem('history',JSON.stringify(history));
            } catch (error) {
                console.log(error);
            }
            
        };
        saveHistory();
    },[history]);

    const onSubmit = useCallback(async () => {

        try {
            setIsLoading(true);
            const result = await translate(enteredText, languageFrom, languageTo);

            if (!result) {
                setResultText("");
                return;
            }

            const textResult = result.translated_text[result.to];
            setResultText(textResult);

            const id = uuid.v4();
            result.id = id;
            result.dateTime = new Date().toISOString();

            //dispatch action
            dispatch(addHistoryItem({item : result}));
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }

    }, [enteredText, languageTo, languageFrom,dispatch]);

    const copyToClipboard = useCallback(async()=>{
        await Clipboard.setStringAsync(resultText);
    },[resultText]);

    const swapLanguage = () => {
        setLanguageFrom(languageTo);
        setLanguageTo(languageFrom);
    };

    return (

        <View style={globalStyles.container}>
            <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
                <View style={globalStyles.translatorButton}>
                    <Button title="Saved" onPress={savedButtonHandler} />
                </View>
                <View style={globalStyles.translatorButton}>
                    <Button title="Setting" onPress={settingButtonHandler} />
                </View>
            </View>
            <View style={globalStyles.languageContainer}>
                <TouchableOpacity style={globalStyles.languageOption} onPress={() => navigation.navigate('LanguageSelectScreenFrom', { selected: languageFrom, mode: 'from' })}>
                    <Text style={globalStyles.languageOptoinText}>{supportedLanguages[languageFrom]}</Text>
                </TouchableOpacity>

                <View style={globalStyles.arrowContainer}>
                <Ionicons  onPress={swapLanguage}  name="swap-horizontal" size={24} color={colors.lightGrey} />
                </View>

                <TouchableOpacity style={globalStyles.languageOption} onPress={() => navigation.navigate('LanguageSelectScreenTo', { selected: languageTo, mode: 'to' })}>
                    <Text style={globalStyles.languageOptoinText}>{supportedLanguages[languageTo]}</Text>
                </TouchableOpacity>
            </View>

            <View style={globalStyles.inputContainer}>
                <TextInput
                    multiline
                    placeholder='Enter text'
                    style={globalStyles.textInput}
                    onChangeText={(text) => setEnteredText(text)}
                />

                <TouchableOpacity
                    onPress={isLoading ? undefined : onSubmit}
                    disabled={enteredText === ""}
                    style={globalStyles.iconContainer}>
                        {
                            isLoading ?
                            <ActivityIndicator size={'small'} color={colors.blue} /> :
                            <Ionicons name="arrow-forward-circle-sharp" size={24} color={enteredText !== "" ? colors.blue : colors.lightBlue} />
                        }

                    
                </TouchableOpacity>
            </View>

            <View style={globalStyles.resultContainer}>
                <Text style={globalStyles.resultText}>{resultText}</Text>

                <TouchableOpacity disabled={resultText === ""} style={globalStyles.iconContainer} onPress={copyToClipboard}>
                    <MaterialIcons name="content-copy" size={24} color={resultText !== "" ? colors.textColor : colors.textColorDisabled} />
                </TouchableOpacity>
            </View>


            <View style={globalStyles.historyContainer}>
                <FlatList
                    data={history.slice().reverse()}
                    renderItem={itemData=> {
                        return <TranslationResult itemId={itemData.item.id}/>
                    }}
                />
            </View>



        </View>


    )
}
