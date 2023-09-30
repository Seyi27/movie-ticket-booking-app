import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const SettingsComponent = (props: any) => {
    return (
        <View style={styles.container}>
            <View>
                {props.icon == 'dollar' ?
                    <FontAwesome name={props.icon} size={24} color="white" style={{ paddingHorizontal: 20 }} />
                    :
                    <AntDesign name={props.icon} size={24} color="white" style={{ paddingHorizontal: 20 }} />
                }
            </View>

            <View style={styles.settingContainer}>
                <Text style={styles.title}>{props.heading}</Text>
                <Text style={styles.subtitle}>{props.subHeading}</Text>
                <Text style={styles.subtitle}>{props.Subtitle}</Text>
            </View>

            <View style={{justifyContent:'center'}}>
                <AntDesign name="right" size={24} color="white" style={{ paddingHorizontal: 20 }} />
            </View>
        </View>
    )
}

export default SettingsComponent

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 20
    },
    settingContainer: {
        flex: 1
    },
    title: {
        fontSize: 18,
        color: 'white'
    },
    subtitle: {
        fontSize: 14,
        color: 'gray'
    }
})