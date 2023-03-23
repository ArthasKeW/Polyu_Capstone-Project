import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import TranslationResult from '../components/TranslationResult';
import { globalStyles } from '../styles/global';
import colors from '../utils/colors';

export default function Home({ navigation }) {
  const savedItems = useSelector(state => state.savedItems.items);

  if(savedItems.length ===0){
      return <View style={styles.noItemsContainer}>
          <Text style={styles.noItemText}>No Saved Items</Text>
      </View>
  }

  return (
    <View style={styles.container}>
    <FlatList
        data={savedItems.slice().reverse()}
        renderItem={itemData => {
            return <TranslationResult itemId={itemData.item.id} />
        }}
    />

</View>

)
}
const styles = StyleSheet.create({

  container: {
      flex: 1,
      backgroundColor: colors.greyBackground,
      padding: 10
  },
  noItemsContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
  },
  noItemText:{
      fontFamily: 'nunito-regular',
      letterSpacing:0.3
  }

})