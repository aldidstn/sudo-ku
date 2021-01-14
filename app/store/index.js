import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initState = {
  boardSudoku: [],
  editBoardSudoku: [],
  loading: true,
  statusSolve: '',
  leaderboard: [],
  score: 0
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_BOARD':
      return { ...state, boardSudoku: action.payload, editBoardSudoku: action.payload, loading: false }
    case 'UPDATE_BOARD':
      return { ...state, editBoardSudoku: action.payload }
    case 'SET_STATUS':
      return { ...state, statusSolve: action.payload }
    case 'SOLVE_BOARD':
      return { ...state, editBoardSudoku: action.payload }
    case 'RESET_STATUS':
      return { ...state, statusSolve: action.payload }
    case 'RESET_ALL':
      return { ...state, boardSudoku: [], editBoardSudoku: [], statusSolve: '', loading: true }
    case 'ADD_LEADERBOARD':
      const newLeaderboard = state.leaderboard.concat(action.payload)
      return { ...state, leaderboard: newLeaderboard }
    case 'SET_SCORE':
      return { ...state, score: action.payload }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store