import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';

const InputText = (props: any) => {
    const [text, setText] = useState<string>('')

    return (
        <View style={styles.inputBox}>
            <TextInput
                placeholder='Search your Movies...'
                placeholderTextColor='#FFFFFF52'
                style={styles.textInput}
                value={text}
                onChangeText={text => setText(text)}
            />
            <TouchableOpacity
                style={styles.searchIcon}
                onPress={() => props.searchFunction(text)}
            >
                <AntDesign name="search1" size={20} color="lightblue" />
            </TouchableOpacity>
        </View>
    )
}

export default InputText

const styles = StyleSheet.create({
    inputBox: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#FFFFFF26'
    },
    textInput: {
        width: '90%',
        fontSize: 14,
        color: 'white'
    },
    searchIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }
})