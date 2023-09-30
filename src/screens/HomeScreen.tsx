import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Dimensions, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputText from '../components/InputText';
import { nowPlayingMovies, popularMovies, upcomingMovies } from '../api';
import CategoryHeader from '../components/CategoryHeader';
import MiniMovieCard from '../components/MiniMovieCard';
import LargeMovieCard from '../components/LargeMovieCard';

const HomeScreen = ({ navigation }: any) => {
  const [nowPlayingMoviesList, setNowPlayMoviesList] = useState<any>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined)
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined)

  const nowPlayingApiFetch = async () => {
    const res = await fetch(nowPlayingMovies);
    const data = await res.json();
    setNowPlayMoviesList(data.results)
  }

  const upcomingMoviesApiFetch = async () => {
    const res = await fetch(upcomingMovies);
    const data = await res.json();
    setUpcomingMoviesList(data.results)
  }

  const popularMoviesApiFetch = async () => {
    const res = await fetch(popularMovies);
    const data = await res.json();
    setPopularMoviesList(data.results)
  }

  // console.log(nowPlayingMoviesList.length)

  useEffect(() => {
    nowPlayingApiFetch();
    upcomingMoviesApiFetch();
    popularMoviesApiFetch();
  }, [])

  return (
    <ScrollView style={styles.container}
      bounces={false}
    >
      {/* For The Loader */}

      {nowPlayingMoviesList == undefined &&
        nowPlayingMoviesList == null &&
        upcomingMoviesList == undefined &&
        upcomingMoviesList == null &&
        popularMoviesList == undefined &&
        popularMoviesList == null
        ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='lightblue' />
          </View>
        ) : (

          <View>
            <CategoryHeader title={'Now Playing'} />
            <FlatList
              horizontal
              data={nowPlayingMoviesList}
              keyExtractor={(item: any) => item.id}
              contentContainerStyle={{ gap: 36 }}
              style={{ marginHorizontal: 20 }}
              renderItem={({ item }) => (
                <LargeMovieCard movie={item} navFunction={() => navigation.navigate('MovieDetails', { movieid: item.id })} /> //We are passing the movie id cause we will use it to access the api in the movie details screen
              )}
            />

            <CategoryHeader title={'Popular'} />
            <FlatList
              horizontal
              data={popularMoviesList}
              keyExtractor={(item: any) => item.id}
              // contentContainerStyle={{ gap: 36 }}
              renderItem={({ item }) => (
                <MiniMovieCard movie={item} navFunction={() => navigation.navigate('MovieDetails', { movieid: item.id })} /> //We are passing the movie id cause we will use it to access the api in the movie details screen
              )}
            />

            <CategoryHeader title={'Upcoming'} />
            <FlatList
              horizontal
              data={upcomingMoviesList}
              keyExtractor={(item: any) => item.id}
              // contentContainerStyle={{ gap: 36 }}
              renderItem={({ item }) => (
                <MiniMovieCard movie={item} navFunction={() => navigation.navigate('MovieDetails', { movieid: item.id })} />//We are passing the movie id cause we will use it to access the api in the movie details screen
              )}
            />
          </View>


        )
      }

    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop:30
  },
  inputHeaderContainer: {
    marginHorizontal: 36,
    marginTop: 28
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30
  }
})