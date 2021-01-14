import React from 'react'
import Leaderboard from 'react-native-leaderboard';
import { useSelector } from 'react-redux'

export default function LeaderBoard({ navigation }) {
  const leaderboard = useSelector((state) => state.leaderboard)

  return (
    <Leaderboard
      data={leaderboard}
      sortBy='highScore'
      labelBy='userName'
    ></Leaderboard>
  )
}