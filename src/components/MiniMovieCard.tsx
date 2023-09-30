import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { baseImagePath } from '../api'

const MiniMovieCard = (props: any) => {
    return (
        <TouchableOpacity  key={props.movie.id} onPress={() => props.navFunction()}>
            <View style={styles.container}>
                <Image
                    source={{ uri: baseImagePath('w342', props.movie.poster_path) }}
                    style={styles.cardImage}
                />
                <Text numberOfLines={2} style={styles.cardtext}>{props.movie.title}</Text>
            </View>
        </TouchableOpacity>

    )
}

export default MiniMovieCard

const styles = StyleSheet.create({
    container: {
        width: 133.33,
        marginHorizontal: 20,
    },
    cardtext: {
        color: '#FFFFFF',
        fontSize: 14,
        textAlign: 'center',
        paddingVertical: 18
    },
    cardImage: {
        // height: 200,
        // width: "100%",
        aspectRatio: 2 / 3,
        borderRadius: 20
    },

})