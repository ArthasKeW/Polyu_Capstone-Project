import { StyleSheet } from "react-native";
import colors from "../utils/colors";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        
    },
    titleText: {
        fontFamily: 'nunito-bold',
        fontSize: 18,
        color: '#333'
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20
    },
    translatorButton: {
        flex: 1, margin: 2
    },



    //TranslatorScreen
    languageContainer: {
        flexDirection: 'row',
        borderTopColor: colors.lightGrey,
        borderTopWidth:1,
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1,
        lignItems: 'center',
        justifyContent: 'center',
    },
    languageOption: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        paddingVertical: 10
    },
    arrowContainer: {
        width:50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    languageOptoinText: {
        color: colors.blue
    },
    inputContainer: {
        flexDirection: 'row',
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1,
    },
    textInput: {
        flex:1,
        marginTop: 10,
        paddingHorizontal: 2,
        paddingVertical: 2,
        letterSpacing: 0.3,
        height:90,
        color:colors.textColor,
        textAlignVertical: 'top'
    },
    iconContainer: {
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:'center'
    },
    resultContainer: {
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1,
        flexDirection:'row',
        height:90,
        paddingVertical:15
    },
    resultText:{
        letterSpacing: 0.3,
        color: colors.blue,
        flex:1,
        marginHorizontal: 2
    },
    historyContainer:{
        backgroundColor: colors.greyBackground,
        flex: 1,
        padding: 10
    }
});