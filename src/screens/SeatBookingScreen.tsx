import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const timeArray: string[] = [
  '10:30',
  '12:30',
  '14:30',
  '15:30',
  '19:30',
  '21:00'
]


// To generate the dates
const generateDate = () => {
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
  // console.log(weekdays)
}

// To generate the seats
const generateSeats = () => {
  let numRow = 8;
  let numColumn = 3;
  let rowArray = [];
  let start = 1;
  let reachnine = false;

  for (let i = 0; i < numRow; i++) {
    let columnArray = [];
    for (let j = 0; j < numColumn; j++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false
      };
      columnArray.push(seatObject);
      start++;
    }
    if (i == 3) {
      numColumn += 2;
    } if (numColumn < 9 && !reachnine) {
      numColumn += 2
    } else {
      reachnine = true;
      numColumn -= 2;
    }
    rowArray.push(columnArray)
  }
  return rowArray;
}

const SeatBookingScreen = ({ navigation, route }: any) => {
  const [dateArray, setDateArray] = useState<any[]>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>()
  const [price, setPrice] = useState<number>(0)
  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats())
  const [selectedSeatArray, setSelectedSeatArray] = useState([])
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>()

  // console.log(JSON.stringify(twoDSeatArray, null, 2))
  // generateDate()

  // To select the seat
  const selectSeat = (index: number, subindex: number, num: number) => {
    if (!twoDSeatArray[index][subindex].taken) {
      let array: any = [...selectedSeatArray];
      let temp = [...twoDSeatArray];
      temp[index][subindex].selected = !temp[index][subindex].selected;
      if (!array.includes(num)) {
        array.push(num);
        setSelectedSeatArray(array);
      } else {
        const tempindex = array.indexOf(num);
        if (tempindex > -1) {
          array.splice(tempindex, 1);
          setSelectedSeatArray(array);
        }
      }
      setPrice(array.length * 5.0);
      setTwoDSeatArray(temp)
    }
  }

  // to save the selected values
  const BookSeats = async () => {
    if (selectedSeatArray.length !== 0 &&
      timeArray[selectedTimeIndex] !== undefined &&
      dateArray[selectedDateIndex] !== undefined
    ) {
      try {
        await AsyncStorage.setItem(
          'ticket',
          JSON.stringify({
            seatArray: selectedSeatArray,
            time: timeArray[selectedTimeIndex],
            date: dateArray[selectedDateIndex],
            ticketImage: route.params.PosterImage
          }),
        );
      } catch (error) {
        console.log('Something went wrong while storing in Bookseats Functions')
      }
      navigation.navigate('Ticket', {
        seatArray: selectedSeatArray,
        time: timeArray[selectedTimeIndex],
        date: dateArray[selectedDateIndex],
        ticketImage: route.params.PosterImage
      });
    } else {
      ToastAndroid.showWithGravity(
        'Please Select Seats, Date and Time of the Show',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      )
    }
  }

  return (
    <ScrollView style={styles.container}>
      {/* The Background Image */}
      <ImageBackground
        source={{
          uri: route.params.bgImage,
        }}
        style={styles.backdropImage}
      >
        <LinearGradient colors={['rgba(0,0,0,0.1)', 'black']} style={styles.linearGradient}></LinearGradient>
      </ImageBackground>

      <TouchableOpacity style={styles.navBack} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={20} color="black" />
      </TouchableOpacity>

      <Text style={styles.screenText}>Screen this side</Text>

      {/* To display the seats and functionality */}
      <View style={styles.seatContainer}>
        <View style={styles.containerGap20}>
          {twoDSeatArray?.map((item, index) => {
            return (
              <View key={index} style={styles.seatRow}>
                {item?.map((subitem, subindex) => (
                  <TouchableOpacity
                    key={subitem.number}
                    onPress={() => selectSeat(index, subindex, subitem.number)}
                  >
                    <MaterialCommunityIcons name="seat"
                      style={[
                        styles.seatIcon,
                        subitem.taken ? { color: 'grey' } : {},
                        subitem.selected ? { color: 'lightblue' } : {}
                      ]} />
                  </TouchableOpacity>
                ))}
              </View>
            )
          })}
        </View>
      </View>

      {/* The extra info */}
      <View style={styles.seatRadioContainer}>
        <View style={styles.radioContainer}>
          <Ionicons name="radio-button-on" size={24} color="white" />
          <Text style={styles.radioText}>Available</Text>
        </View>
        <View style={styles.radioContainer}>
          <Ionicons name="radio-button-on" size={24} color="gray" />
          <Text style={styles.radioText}>Taken</Text>
        </View>
        <View style={styles.radioContainer}>
          <Ionicons name="radio-button-on" size={24} color="lightblue" />
          <Text style={styles.radioText}>Selected</Text>
        </View>
      </View>

      {/* The Dates */}
      <View>
        <FlatList
          data={dateArray}
          keyExtractor={item => item.data}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={item.id} onPress={() => setSelectedDateIndex(index)}>
              <View
                style={[
                  styles.dateContainer,
                  index == 0
                    ? { marginLeft: 24 }
                    : index == dateArray.length - 1
                      ? { marginRight: 24 }
                      : {},
                  index == selectedDateIndex
                    ? { backgroundColor: 'lightblue' }
                    : {}
                ]}>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.dayText}>{item.day}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* The Time */}
      <View style={{ marginVertical: 24 }}>
        <FlatList
          data={timeArray}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.containerGap24}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={item} onPress={() => setSelectedTimeIndex(index)}>
              <View
                style={[
                  styles.timeContainer,
                  index == 0
                    ? { marginLeft: 24 }
                    : index == dateArray.length - 1
                      ? { marginRight: 24 }
                      : {},
                  index == selectedTimeIndex
                    ? { backgroundColor: 'lightblue' }
                    : {}
                ]}>
                <Text style={styles.timeText}>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* The Price and Button */}
      <View style={styles.buttonPriceContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalPriceText}>Total Price</Text>
          <Text style={styles.price}>${price}.00</Text>
        </View>
        <TouchableOpacity onPress={BookSeats}>
          <Text style={styles.buttonText}>Buy Tickets</Text>
        </TouchableOpacity>
      </View>
    </ScrollView >
  )
}

export default SeatBookingScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1
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
  screenText: {
    textAlign: 'center',
    fontSize: 10,
    color: 'gray'
  },
  seatContainer: {
    marginVertical: 20
  },
  containerGap20: {
    gap: 20
  },
  seatRow: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center'
  },
  seatIcon: {
    fontSize: 24,
    color: 'white'
  },
  seatRadioContainer: {
    flexDirection: 'row',
    marginTop: 36,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  radioContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center'
  },
  radioText: {
    fontSize: 12,
    color: 'white'
  },
  containerGap24: {
    gap: 24
  },
  dateContainer: {
    width: 57,
    height: 78,
    borderRadius: 32.5,
    backgroundColor: '#0B0B0B',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateText: {
    fontSize: 24,
    color: 'white'
  },
  dayText: {
    fontSize: 12,
    color: 'white'
  },
  timeContainer: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#0B0B0B',
    alignItems: 'center',
    justifyContent: 'center'
  },
  timeText: {
    fontSize: 14,
    color: 'white'
  },
  buttonPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24
  },
  priceContainer: {
    alignItems: 'center'
  },
  totalPriceText: {
    color: 'gray',
    fontSize: 14
  },
  price: {
    color: 'white',
    fontSize: 24
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'lightblue',
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 10
  }
})
