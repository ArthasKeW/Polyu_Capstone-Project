import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import colors from "../utils/colors"

export default SettingsItem = props => {
    return <TouchableOpacity style={style.container} onPress={props.onPress}>
        <View style={style.textContainer}>
            <Text
                numberOfLines = {1}
                style = {StyleSheet.title}>
                {props.title}
            </Text>

            <Text
                numberOfLines = {1}
                style = {StyleSheet.title}>
                {props.subTitle}
            </Text>
        </View>

        <View>
            <View style={style.iconContainer}>
                <props.iconFamily name={props.icon} size={24} color={colors.blue}/>
            </View>
        </View>

    </TouchableOpacity>
}

const style = StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: colors.lightGrey,
        borderWidth: 0.5,
        borderTopWidth:0,
        paddingVertical:10,
        paddingHorizontal:20

    },
    textContainer:{
        flex:1,
        marginRight:8,
    },
    title:{
        fontFamily: 'nunito-bold',
        letterSpacing: 0.3,
        color: colors.textColor
    },
    subTitle:{
        fontFamily: 'nunito-regular',
        letterSpacing: 0.3,
        color: colors.subTextColor,
        fontSize: 13
    },
    iconContainer:{
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})