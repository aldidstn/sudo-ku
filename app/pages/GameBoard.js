import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, Button, ImageBackground, ScrollView } from 'react-native';
import { fetchBoard, solveBoard, validateBoard } from '../store/sugokuAction'
import { useDispatch, useSelector } from 'react-redux'
import LottieView from 'lottie-react-native';
import CountDown from 'react-native-countdown-component';


export default function GameBoard({ route, navigation }) {
  const { name, difficult } = route.params
  const [running, setRunning] = useState(true)
  const dispatch = useDispatch()
  const board = useSelector((state) => state.boardSudoku)
  const editboard = useSelector((state) => state.editBoardSudoku)
  const status = useSelector((state) => state.statusSolve)
  const loading = useSelector((state) => state.loading)
  const score = useSelector((state) => state.score)

  function resetStatus() {
    dispatch({
      type: 'RESET_STATUS',
      payload: ''
    })
  }
  useEffect(() => {
    if (status === 'unsolved') {
      Alert.alert(
        'Sudoku Board Unsolved')
      resetStatus()
    }
    else if (status === 'broken') {
      Alert.alert(
        'Sudoku Board Wrong Answer / Broken')
      resetStatus()
    } else if (status === 'solved') {
      setRunning(false)
      dispatch({
        type: 'ADD_LEADERBOARD',
        payload: {
          userName: name,
          highScore: score
        }
      })
      navigation.replace('Finish', { name, status: 'win' })
    }
  }, [status])

  useEffect(() => {
    dispatch(fetchBoard(difficult))
  }, [dispatch])

  function onChangeText(value, rowIndex, colIndex) {
    let newBoard = JSON.parse(JSON.stringify(editboard))
    newBoard[rowIndex][colIndex] = +value
    dispatch({
      type: 'UPDATE_BOARD',
      payload: newBoard
    })
  }

  function solve() {
    dispatch(solveBoard(board))
  }

  function validate() {
    dispatch(validateBoard(editboard))
  }

  function giveUp() {
    setRunning(false)
    navigation.replace('Finish', { name, status: 'lose' })
  }

  if (loading) {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          style={{
            width: 400,
            height: 400,
            backgroundColor: '#fff',
          }}
          source={require('../assets/loading.json')}
          autoPlay
          loop
        />
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: 'https://i.pinimg.com/originals/6d/ba/8a/6dba8a894b424efb4fece2ae6db36e47.jpg'
          }}
          style={styles.image}
        >
          <Text style={{ fontSize: 20 }}> Timer :</Text>
          <CountDown
            until={60 * 10 + 30}
            size={30}
            onFinish={giveUp}
            digitStyle={{ backgroundColor: '#FFF' }}
            digitTxtStyle={{ color: '#1CC625' }}
            timeToShow={['M', 'S']}
            running={running}
            onChange={(value) => dispatch({
              type: 'SET_SCORE',
              payload: value
            })}
          />

          <Text
            tyle={{
              fontFamily: 'monospace',
              fontSize: 50,
              marginVertical: 10,
              color: '#30475e'
            }}
          >Sugoku.</Text>
          <View style={styles.boardContainer}>
            {editboard.map((row, rowIndex) => (
              <View style={styles.rowContainer} key={rowIndex}>
                {row.map((number, colIndex) => {
                  return <TextInput
                    key={'' + rowIndex + colIndex}
                    onChangeText={(text) => onChangeText(text, rowIndex, colIndex)}
                    value={number !== 0 ? number.toString() : ''}
                    keyboardType='number-pad'
                    editable={board[rowIndex][colIndex] === 0}
                    maxLength={1}
                    style={styles.textInputStyle}
                    backgroundColor={board[rowIndex][colIndex] === 0 ? '#fff' : '#bce6eb'}
                  ></TextInput>
                })}
              </View>
            ))}
          </View>
          <View
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'stretch',
              paddingHorizontal: 40,
              paddingTop: 40
            }}
          >
            <Button onPress={validate} title='Validate'></Button>
            <Button onPress={solve} title='Solve'></Button>
            <Button onPress={giveUp} title='Give Up'></Button>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardContainer: {
    width: 360,
    height: 360,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    alignItems: 'stretch',
    textAlign: 'center'
  },
  textInputStyle: {
    textAlign: 'center',
    fontSize: 23,
    height: 40,
    borderWidth: 1,
    width: 40,
    color: 'black'
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 440,
    height: 800
  },
});