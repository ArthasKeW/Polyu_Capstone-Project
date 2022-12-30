import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { globalStyles } from '../styles/global';


export default function Home({ navigation }) {
    const pressHandler = () => {

    }

    return (

        <View style={globalStyles.container}>
            <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Button title="Saved" onPress={pressHandler} />
                </View>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Button title="Setting" onPress={pressHandler} />
                </View>
            </View>
            <Text style={globalStyles.titleText}>saved</Text>

        </View>

    )
}
const translatorButton = StyleSheet.create({

    button: {
        flexDirection: 'row',
        height: 50,
        marginTop: 50,
        elevation: 3,
        width: 50
    }

})