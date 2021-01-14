import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider as PaperProvider } from 'react-native-paper'
import { Home, GameBoard, LeaderBoard, Finish } from './pages/index'
import store from './store/index'

export default function App() {
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <PaperProvider>
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Game' component={GameBoard} />
            <Stack.Screen name='Finish' component={Finish} />
            <Stack.Screen name='Leaderboard' component={LeaderBoard} />
          </Stack.Navigator>
        </Provider>
      </PaperProvider>
    </NavigationContainer>
  )
}