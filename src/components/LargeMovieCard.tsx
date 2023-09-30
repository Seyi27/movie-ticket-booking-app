import { FlatList, Image,Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { baseImagePath } from '../api'
import { AntDesign } from '@expo/vector-icons';

const LargeMovieCard = (props: any) => {
    const genres: any = {
      28: 'Action',
      12: 'Adventure',
      16: 'Animation',
      35: 'Comedy',
      88: 'Crime',
      99: 'Documentry',
      18: 'Drama',
      10751: 'Family',
      14: 'Fantasy',
      36: 'History',
      27: 'Horror',
      10402: 'Music',
      9648: 'Mystry',
      10749: 'Romance',
      878: 'Science Fiction',
      10770:'Tv Movie',
      53: 'Thriller',
      10752: 'War',
      37: 'Western',
    }
    return (
        <TouchableOpacity style={styles.container} key={props.movie.id} onPress={()=>props.navFunction()}>
            <Image
                source={{ uri: baseImagePath('w780', props.movie.poster_path) }}
                style={styles.cardImage}
            />

            <View>
                <View style={styles.rateContainer}>
                    <AntDesign name="star" size={24} color="orange" />
                    <Text style={styles.voteText}>
                        {props.movie.vote_average} ({props.movie.vote_count})
                    </Text>
                </View>

                <Text numberOfLines={2} style={styles.cardtext}>{props.movie.title}</Text>
            </View>

            <View style={styles.genreContainer}>
                {props.movie.genre_ids.slice(0, 2).map((item: any) => (
                    <View key={item} style={styles.genreBox}>
                        <Text style={{ color: 'white' }}>{genres[item]}</Text>
                    </View>
                ))}
            </View>
        </TouchableOpacity>

    )
}

export default LargeMovieCard

const styles = StyleSheet.create({
    container: {
        width: 300,
        // marginRight: 10,
    },
    cardtext: {
        color: '#FFFFFF',
        fontSize: 14,
        textAlign: 'center',
        paddingVertical: 18
    },
    cardImage: {
        height: 449.36,
        width: "100%",
        borderRadius: 20
    },
    rateContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    voteText: {
        fontSize: 14,
        color: 'white'
    },
    genreContainer: {
        flexDirection: 'row',
        gap: 20,
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    genreBox: {
        borderWidth: 1,
        borderColor: 'white',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20
    }
})