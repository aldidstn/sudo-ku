import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function CustomButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.button, ...props.style }}>
        <Text style={{ ...styles.buttonText, ...props.textStyling }}>
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8bcdcd',
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  }
})