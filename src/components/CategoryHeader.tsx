import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import MiniMovieCard from './MiniMovieCard';

const CategoryHeader = (props: any) => {
    return (
        <View >
            <Text style={styles.text}>{props.title}</Text>
        </View>
    )
}

export default CategoryHeader

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: 'white',
        paddingHorizontal: 20,
        paddingVertical: 28
    },

})