import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CastCard = (props: any) => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: props.imagePath }}
                style={styles.cardImage}
            />
            <Text style={styles.title} numberOfLines={2}>
                {props.title}
            </Text>
            <Text style={styles.subtitle} numberOfLines={2}>
                {props.subtitle}
            </Text>
        </View>
    )
}

export default CastCard

const styles = StyleSheet.create({
    container:{
        alignItems:'center'
    },
    cardImage:{
        aspectRatio:1920/2880,
        borderRadius:20,
        width:80
    },
    title:{
        alignSelf:'stretch',
        fontSize:12,
        color:'white'
    },
    subtitle:{
        alignSelf:'stretch',
        fontSize:10,
        color:'white'
    }
})