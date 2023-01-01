import React, { useCallback } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import SettingsItem from '../components/SettingsItem';
import { globalStyles } from '../styles/global';
import colors from '../utils/colors';
import { AntDesign} from'@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { clearHistory } from '../store/historySlice';
import { setSavedItems } from '../store/savedItemsSlice';


export default function Home({ navigation }) {

    const dispatch = useDispatch();
 
    const deleteHistory = useCallback(async () => {
        try {
            await AsyncStorage.setItem('history', JSON.stringify([]));
            dispatch(clearHistory());
            Alert.alert('History cleared');
        } catch (error) {
            console.log(error);
        }
    },[dispatch])

    const deleteSavedItems = useCallback(async () => {
        try {
            await AsyncStorage.setItem('savedItems', JSON.stringify([]));
            dispatch(setSavedItems({items:[]}));
            Alert.alert('Saved items cleared');
        } catch (error) {
            console.log(error);
        }
    },[dispatch])

    return (

        <View style={styles.container}>
            <SettingsItem 
                title='Clear history'
                subTitle='Clears all items from your history'
                iconFamily={AntDesign}
                icon = 'delete'
                onPress={deleteHistory}
            />
            <SettingsItem 
                title='Clear saved history'
                subTitle='Clears all saved items'
                iconFamily={AntDesign}
                icon = 'delete'
                onPress ={deleteSavedItems}
            />
        </View>

    )
}
const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: colors.greyBackground,
        padding: 10,
    }

})