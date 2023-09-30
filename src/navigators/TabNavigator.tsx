import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import TicketScreen from '../screens/TicketScreen';
import UserAccountScreen from '../screens/UserAccountScreen';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    backgroundColor: 'black',
                    borderTopWidth: 0,
                }
            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={[styles.activebackgroundcolor, focused ? { backgroundColor: 'lightblue' } : {}]}>
                                <Entypo name="video" size={20} color="white" />
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={[styles.activebackgroundcolor, focused ? { backgroundColor: 'lightblue' } : {}]}>
                                <AntDesign name="search1" size={20} color="white" />
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Ticket"
                component={TicketScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={[styles.activebackgroundcolor, focused ? { backgroundColor: 'lightblue' } : {}]}>
                                <FontAwesome5 name="ticket-alt" size={20} color="white" />
                            </View>
                        )
                    }
                }} />
            <Tab.Screen
                name="User"
                component={UserAccountScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={[styles.activebackgroundcolor, focused ? { backgroundColor: 'lightblue' } : {}]}>
                                <Entypo name="user" size={20} color="white" />
                            </View>
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    activebackgroundcolor: {
        padding: 10,
        borderRadius: 20
    }
})