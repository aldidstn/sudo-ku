import { StyleSheet, View, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../components/CustomButton'
import { RadioButton, Text } from 'react-native-paper'

export default function Home({ navigation }) {
  const [value, setValue] = useState('easy')
  const [name, setName] = useState('')

  function play() {
    if (!name || !value) {
      Alert.alert(
        'Name & difficulty Cannot be empty'
      )
    } else {
      navigation.replace('Game', {
        name: name,
        difficult: value
      })
    }

  }

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          onChangeText={(value) => setName(value)}
          style={{
            height: 50,
            fontSize: 20,
            borderColor: 'black',
            width: 300,
            borderBottomWidth: 1
          }}
          placeholder='Insert Your Name'
        />
        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
          <Text style={{ marginTop: 20 }}>Select Difficulty:</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20
          }}
          >
            <View>
              <Text>Easy</Text>
              <RadioButton value='easy' />
            </View>
            <View>
              <Text>Med</Text>
              <RadioButton value='medium' />
            </View>
            <View>
              <Text>Hard</Text>
              <RadioButton value='hard' />
            </View>
          </View>
        </RadioButton.Group>
        <CustomButton onPress={play} style={{ marginTop: 40 }}>Play Now!</CustomButton>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 80
  }
})