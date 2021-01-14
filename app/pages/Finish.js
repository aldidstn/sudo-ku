import React from 'react'
import CustomButton from '../components/CustomButton'
import { StyleSheet, ImageBackground, Image, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux'

export default function Finish({ route, navigation }) {
  const { name, status } = route.params
  const dispatch = useDispatch()

  function playAgain() {
    dispatch({
      type: 'RESET_ALL'
    })
    navigation.replace('Home')
  }

  function toLeaderboard() {
    navigation.navigate('Leaderboard')
  }

  if (status === 'win') {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: 'https://i.pinimg.com/originals/6d/ba/8a/6dba8a894b424efb4fece2ae6db36e47.jpg'
          }}
          style={styles.image}
        ></ImageBackground>
        <View style={styles.imageContainer}>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 20,
              textAlign: 'center'
            }}
          >Congratulations {name}, You Win</Text>
          <Text style={{ textAlign: 'center' }}>winner</Text>
          <Image
            style={{
              width: 200,
              height: 200,
              marginTop: 20
            }}
            source={require('../assets/win.gif')}
          />
        </View>
        <CustomButton onPress={playAgain} style={{ marginTop: 30 }}>Play Again</CustomButton>
        <CustomButton onPress={toLeaderboard} style={{ marginTop: 10 }}>Leaderboard</CustomButton>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: 'https://i.pinimg.com/564x/1c/17/63/1c176327b6af065093b3b37c9f4e4785.jpg'
          }}
          style={styles.image}
        ></ImageBackground>
        <View style={styles.imageContainer}>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 20,
              textAlign: 'center'
            }}
          >{name}, You Lose</Text>
          <Text style={{ textAlign: 'center' }}>Try much harder next time</Text>
          <Image
            style={{
              width: 200,
              height: 200,
              marginTop: 20
            }}
            source={require('../assets/lose.gif')}
          />
        </View>
        <CustomButton onPress={playAgain} style={{ marginTop: 30 }}>Play Again</CustomButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  }, image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 440,
    height: 1000
  },
  imageContainer: {
    width: 200,
    height: 400,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
})