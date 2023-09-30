import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MiniMovieCard from '../components/MiniMovieCard'
import { searchMovies } from '../api'
import InputText from '../components/InputText'

const SearchScreen = ({ navigation }: any) => {
  const [searchList, setSetsearchList] = useState([])

  const { width, height } = Dimensions.get('screen')

  const searchMoviesFunction = async (name: string) => { //The function used to fetch the search api by passing in the name
    try {
      let response = await fetch(searchMovies(name)); //fetching the search api function in the api.tsx file
      let json = await response.json();
      setSetsearchList(json.results)
    } catch (error) {
      console.error('Something went wrong in searchMoviesFunction')
    }
  }

  return (
    <View style={[styles.container, { width: width }]}>
      <FlatList
        numColumns={2}
        ListHeaderComponent={
          <View style={styles.inputHeaderContainer}>
            <InputText searchFunction={searchMoviesFunction} />
          </View>
        }
        data={searchList}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.centerContainer}
        renderItem={({ item, index }) => (
          <MiniMovieCard movie={item} navFunction={() => navigation.navigate('MovieDetails', { movieid: item.id })} />
        )}
      />
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  inputHeaderContainer: {
    marginHorizontal: 30,
    marginTop: 28,
    marginVertical: 28
  },
  centerContainer: {
    alignItems: 'center',
  }
})