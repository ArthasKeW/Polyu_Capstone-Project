import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, TextInput } from 'react-native';
import { globalStyles } from '../styles/global';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import colors from '../utils/colors';

export default function TranslatorScreen({ navigation }) {
    const savedButtonHandler = () => {
        navigation.navigate('TranslatorScreen_Saved')
    }
    const settingButtonHandler = () => {
        navigation.navigate('TranslatorScreen_Setting')
    }
    const [enteredText, setEnteredText] = useState("");
    const [resultText, setResultText] = useState("");

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
                <TouchableOpacity style={globalStyles.languageOption} onPress={() => navigation.navigate('LanguageSelectScreenFrom')}>
                    <Text style={globalStyles.languageOptoinText}>English</Text>
                </TouchableOpacity>

                <View style={globalStyles.arrowContainer}>
                    <AntDesign name="arrowright" size={24} color={colors.lightGrey} />
                </View>

                <TouchableOpacity style={globalStyles.languageOption} onPress={() => navigation.navigate('LanguageSelectScreenTo')}>
                    <Text style={globalStyles.languageOptoinText}>Chinese</Text>
                </TouchableOpacity>
            </View>

            <View style={globalStyles.inputContainer}>
                <TextInput
                    multiline
                    placeholder='Enter text'
                    style={globalStyles.textInput}
                    onChangeText={(text) => setEnteredText(text)}
                />

                <TouchableOpacity disabled={enteredText === ""} style={globalStyles.iconContainer}>
                    <Ionicons name="arrow-forward-circle-sharp" size={24} color={enteredText !== "" ? colors.blue : colors.lightBlue} />
                </TouchableOpacity>
            </View>

            <View style={globalStyles.resultContainer}>
                <Text style={globalStyles.resultText}>{resultText}</Text>

                <TouchableOpacity disabled={resultText === ""} style={globalStyles.iconContainer}>
                    <MaterialIcons name="content-copy" size={24} color={resultText !== "" ? colors.textColor : colors.textColorDisabled} />
                </TouchableOpacity>
            </View>


            <View style={globalStyles.historyContainer}>

            </View>



        </View>


    )
}
