import React, { useState } from 'react';
import * as Font from 'expo-font';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/home';
import AppLoading from 'expo-app-loading';
import Navigator from './routes/homeStack';
import { Provider } from 'react-redux';
import store from './store/store';

const getFonts = () => Font.loadAsync({
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf')
});


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={() => console.log('error')}
      />
    )
  }
}