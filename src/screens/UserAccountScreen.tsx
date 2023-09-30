import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import SettingsComponent from '../components/SettingsComponent'
import { AntDesign } from '@expo/vector-icons';

const UserAccountScreen = ({ navigation }: any) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'My Profile',
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

  return (
    <View style={styles.container}>
      {/* The Avatar */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://th.bing.com/th/id/OIP.QmA7L6shZrie6OfGpixiLAHaEK?w=316&h=180&c=7&r=0&o=5&pid=1.7' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileImageText}>John Doe</Text>
      </View>

      {/* The Profile Settings */}
      <View style={styles.profileContainer}>
        <SettingsComponent
          icon='user'
          heading='Account'
          subHeading='Edit Profile'
          Subtitle='Change Password'
        />

        <SettingsComponent
          icon='setting'
          heading='Settings'
          subHeading='Theme'
          Subtitle='Permissions'
        />

        <SettingsComponent
          icon='dollar'
          heading='Offers & Refferals'
          subHeading='Offer'
          Subtitle='Refferals'
        />

        <SettingsComponent
          icon='info'
          heading='About'
          subHeading='About Movies'
          Subtitle='more'
        />
      </View>
    </View>
  )
}

export default UserAccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  profileContainer: {
    alignItems: 'center',
    padding: 36
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 80
  },
  profileImageText: {
    color: 'white',
    fontSize: 16,
    marginTop: 16
  }
})