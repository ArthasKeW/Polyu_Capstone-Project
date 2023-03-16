import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import TranslationResult from '../components/TranslationResult';
import { globalStyles } from '../styles/global';
import colors from '../utils/colors';



export default function Home({ navigation }) {
  const savedItems = useSelector(state => state.savedItems.items);

  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpand = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter(id => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedItems.includes(item.id);

    return (
      <TouchableOpacity onPress={() => toggleExpand(item.id)}>
        <TranslationResult itemId={item.id} />
        {isExpanded && (
          <View style={styles.expandedContent}>
            <Text>"{item.additionalContent}"</Text>
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
});
