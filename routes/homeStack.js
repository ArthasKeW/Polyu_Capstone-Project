import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import TranslatorScreen from '../screens/TranslatorScreen';
import TranslatorScreen_Saved from '../screens/TranslatorScreen_Saved';
import TranslatorScreen_Setting from '../screens/TranslatorScreen_Setting'
import LanguageSelectScreen from '../screens/LanguageSelectScreen';

const screens = {
    Home: {
        screen: Home
    },
    TranslatorScreen: {
        screen: TranslatorScreen
    },
    TranslatorScreen_Saved: {
        screen: TranslatorScreen_Saved,
        navigationOptions: {
            title: 'Saved',

        }
    },
    TranslatorScreen_Setting: {
        screen: TranslatorScreen_Setting,
        navigationOptions: {
            title: 'Setting',

        }
    },
    LanguageSelectScreenFrom: {
        screen: LanguageSelectScreen,
        navigationOptions: {
            title: 'Translate from',

        }
    },
    LanguageSelectScreenTo: {
        screen: LanguageSelectScreen,
        navigationOptions: {
            title: 'Translate to',

        }
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);