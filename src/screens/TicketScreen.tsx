import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const TicketScreen = ({ navigation, route }: any) => {
  const [ticketDate, setTicketDate] = useState<any>(route.params)

  //To get the data from the async storage
  useEffect(() => {
    (async () => {
      try {
        const ticket = await AsyncStorage.getItem('ticket');
        if (ticket !== undefined && ticket !== null) {
          setTicketDate(JSON.parse(ticket))
        }
      } catch (error) {
        console.log('Something went wrong while getting Data', error)
      }
    })();

    navigation.setOptions({
      title: 'My Tickets',
      headerTitleStyle: { color: 'white' },
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: 'black',
      },
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 30 }} onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
      ),

    })
  }, [])

  //To Check the data and update the state with the route.params.
  if (ticketDate !== route.params && route.params != undefined) {
    setTicketDate(route.params)
  }

  return (
    <View style={styles.container}>
      <View style={styles.ticketContainer}>
        <ImageBackground
          source={{
            uri: ticketDate?.ticketImage
          }}
          style={styles.ticketBGImage}
        >
          <LinearGradient colors={['rgba(255,85,36,0)', 'lightblue']} style={styles.linearGradient}>
            <View
              style={[
                styles.blackCircle,
                {
                  position: 'absolute',
                  bottom: -40,
                  left: -40
                }]}></View>
            <View
              style={[
                styles.blackCircle,
                {
                  position: 'absolute',
                  bottom: -40,
                  right: -40
                }]}></View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.linear}></View>


        <View style={styles.ticketFooter}>
          <View
            style={[
              styles.blackCircle,
              {
                position: 'absolute',
                top: -40,
                left: -40
              }]}></View>
          <View
            style={[
              styles.blackCircle,
              {
                position: 'absolute',
                top: -40,
                right: -40
              }]}></View>

          <View style={styles.ticketDataContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.dateTitle}>{ticketDate?.date.date}</Text>
              <Text style={styles.subtitle}>{ticketDate?.date.day}</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Feather name="clock" size={24} color="white" style={{ paddingBottom: 5 }} />
              <Text style={styles.subtitle}>{ticketDate?.date.day}</Text>
            </View>
          </View>

          <View style={styles.ticketSeatContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Hall</Text>
              <Text style={styles.subtitle}>82</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Row</Text>
              <Text style={styles.subtitle}>84</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Seats</Text>
              <Text style={styles.subtitle}>
                {ticketDate?.seatArray.slice(0, 3).map((item: any, index: number, arr: any) => {
                  return item + (index == arr.length - 1 ? '' : ',');
                })}
              </Text>
            </View>
          </View>

          {/* Barcode Image */}
          <Image
            source={{ uri: 'https://th.bing.com/th/id/OIP.r2XqZH9QbcZz_x72JaCJeAHaCw?w=312&h=130&c=7&r=0&o=5&pid=1.7' }}
            style={styles.barcodeImage}
          />
        </View>
      </View>
    </View>
  )
}

export default TicketScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  navIcon: {
    backgroundColor: 'lightblue',
    height: 30,
    width: 30,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  ticketContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  ticketBGImage: {
    alignSelf: 'center',
    width: 300,
    aspectRatio: 200 / 300,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
    justifyContent: 'flex-end',

  },
  linearGradient: {
    height: '70%'
  },
  linear: {
    borderTopColor: 'black',
    borderTopWidth: 2,
    width: 300,
    alignSelf: 'center',
    backgroundColor: 'lightblue',
    borderStyle: 'dashed'
  },
  ticketFooter: {
    backgroundColor: 'lightblue',
    width: 300,
    alignItems: 'center',
    paddingBottom: 36,
    alignSelf: 'center',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25
  },
  ticketDataContainer: {
    flexDirection: 'row',
    gap: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  ticketSeatContainer: {
    flexDirection: 'row',
    gap: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  dateTitle: {
    fontSize: 24,
    color: 'white'
  },
  subtitle: {
    fontSize: 14,
    color: 'white'
  },
  subheading: {
    fontSize: 18,
    color: 'white'
  },
  subtitleContainer: {
    alignItems: 'center'
  },
  barcodeImage: {
    height: 50,
    aspectRatio: 158 / 52
  },
  blackCircle: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: 'black',
  }
})