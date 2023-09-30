import { ActivityIndicator, ImageBackground, FlatList, TouchableOpacity, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { baseImagePath, movieCastDetails, movieDetails } from '../api';
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import CategoryHeader from '../components/CategoryHeader';
import CastCard from '../components/CastCard';

const MovieDetailsScreen = ({ navigation, route }: any) => {
  const [movieData, setMovieData] = useState<any>(undefined);
  const [movieCastData, setMovieCastData] = useState<any>(undefined)

  const getMovieDataApiFetch = async (movieId: number) => {
    try {
      const res = await fetch(movieDetails(movieId));
      const data = await res.json();
      setMovieData(data)
    } catch {
      console.error('Something went wrong in getMovieDataApiFetch function');
    }
  }

  // OR
  // const getMovieDataApiFetch = async (movieId: number) => {
  //     const res = await fetch(movieDetails(movieId));
  //     const data = await res.json();
  //     setMovieData(data)
  // }

  const getMovieCastDetailsApiFetch = async (movieId: number) => {
    try {
      const res = await fetch(movieCastDetails(movieId));
      const data = await res.json();
      setMovieCastData(data.cast)
    } catch {
      console.error('Something went wrong in getMovieCastDetailsApiFetch function');
    }
  }

  // OR
  // const getMovieCastDetailsApiFetch = async (movieId: number) => {
  //   const res = await fetch(movieDetails(movieId));
  //   const data = await res.json();
  //   setMovieCastData(data)
  // }

  useEffect(() => {
    getMovieDataApiFetch(route.params.movieid)
    getMovieCastDetailsApiFetch(route.params.movieid)
  }, [])

  // console.log(movieData)
  // console.log(movieCastData)

  return (
    <ScrollView style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {movieData == undefined &&
        movieData == null &&
        movieCastData == undefined &&
        movieCastData == null
        ?
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color='lightblue' />
        </View>
        :

        <View>
          {/* Background Image */}
          <ImageBackground
            source={{
              uri: baseImagePath('w780', movieData?.backdrop_path),
            }}
            style={styles.backdropImage}
          >
            <LinearGradient colors={['rgba(0,0,0,0.1)', 'black']} style={styles.linearGradient}></LinearGradient>
          </ImageBackground>

          <TouchableOpacity style={styles.navBack} onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={20} color="black" />
          </TouchableOpacity>

          {/* Poster Image */}
          <View style={{ width: '100%' }}>
            <Image
              source={{ uri: baseImagePath('w342', movieData?.poster_path) }}
              style={styles.cardImage}
            />
          </View>

          {/* The Movie Time */}
          <View style={styles.timeContainer}>
            <Feather name="clock" size={24} color="white" style={{ marginRight: 10 }} />
            <Text style={{ color: 'white', fontSize: 15 }}>
              {Math.floor(movieData?.runtime / 60)}h {''}
              {Math.floor(movieData?.runtime % 60)}m
            </Text>
          </View>

          {/* The Genre */}
          <View>
            <Text style={styles.title}>{movieData?.original_title}</Text>
            <View style={styles.genreContainer}>
              {movieData?.genres ?
                (movieData?.genres.map((item: any) => (
                  <View key={item.id} style={styles.genreBox}>
                    <Text style={{ color: 'white' }}>{item.name}</Text>
                  </View>)
                )) : null}
            </View>
            <Text style={styles.tagline}>{movieData?.tagline}</Text>
          </View>

          {/* The Vote, release date and Description */}
          <View style={styles.infoContainer}>
            <View style={styles.rateContainer}>
              <AntDesign name="star" size={24} color="orange" />
              {movieData.vote_average && (
                <Text style={{ color: 'white', fontSize: 15 }}>
                  {movieData.vote_average.toFixed(1)} ({movieData?.vote_count})
                </Text>
              )}
              {movieData.release_date && (
                <Text style={{ color: 'white', fontSize: 15 }}>
                  {movieData.release_date.substring(8, 10)}{' '}
                  {new Date(movieData?.release_date).toLocaleString('default', { month: 'long' })}{' '}
                  {movieData.release_date.substring(0, 4)}
                </Text>
              )}
            </View>
            <Text style={styles.descriptionText}>{movieData?.overview}</Text>
          </View>

          {/* The Cast */}
          <View>
            <CategoryHeader title='Top Cast' />
            <FlatList
              horizontal
              data={movieCastData}
              keyExtractor={(item: any) => item.id}
              contentContainerStyle={{ gap: 24 }}
              renderItem={({ item, index }) => (
                <CastCard
                  title={item.original_name}
                  subtitle={item.character}
                  imagePath={baseImagePath('w185', item.profile_path)}
                />
              )}
            />
          </View>

          {/* The Button */}
          <View>
            <TouchableOpacity
              style={styles.buttonGB}
              onPress={() => {
                navigation.navigate('SeatBooking', {
                  bgImage: baseImagePath('w780', movieData.backdrop_path),
                  PosterImage: baseImagePath('w780', movieData.poster_path)
                })
              }}
            >
              <Text style={styles.buttonText}>Select Seats</Text>
            </TouchableOpacity>
          </View>

        </View>
      }


    </ScrollView>
  )
}

export default MovieDetailsScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30

  },
  backdropImage: {
    width: '100%',
    height: 300,

  },
  linearGradient: {
    height: '100%',

  },
  navBack: {
    height: 30,
    width: 30,
    backgroundColor: 'lightblue',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 20,
    top: 40
  },
  cardImage: {
    width: 236,
    alignSelf: 'center',
    height: 353,
    marginTop: -150
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginHorizontal: 36,
    marginVertical: 15,
    textAlign: 'center'
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
  },
  tagline: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'white',
    marginHorizontal: 36,
    marginVertical: 15,
    textAlign: 'center'
  },
  infoContainer: {
    marginHorizontal: 24
  },
  rateContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  descriptionText: {
    fontSize: 14,
    color: 'white'
  },
  buttonGB: {
    alignItems: 'center',
    marginVertical: 24
  },
  buttonText: {
    fontSize: 14,
    backgroundColor: 'lightblue',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25
  }
})