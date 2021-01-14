import axios from 'axios'
import { encodeParams } from '../helpers/helper'

const url = 'https://sugoku.herokuapp.com'

export function fetchBoard(diff) {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `${url}/board?difficulty=${diff}`
    })
      .then(({ data }) => {
        dispatch({
          type: 'SET_BOARD',
          payload: data.board
        })
      })
      .catch(err => {
        console.log(err.response);
      })
  }
}

export function validateBoard(data) {
  const board = {
    board: data
  }

  return (dispatch) => {
    axios({
      method: 'post',
      url: `${url}/validate`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: encodeParams(board)
    })
      .then(({ data }) => {
        console.log(data)
        dispatch({
          type: 'SET_STATUS',
          payload: data.status
        })
      })
      .catch(err => {
        console.log(err.response);
      })
  }
}


export function solveBoard(data) {
  const board = {
    board: data
  }

  return (dispatch) => {
    axios({
      method: 'post',
      url: `${url}/solve`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: encodeParams(board)
    })
      .then(({ data }) => {
        dispatch({
          type: 'SOLVE_BOARD',
          payload: data.solution
        })
      })
      .catch(err => {
        console.log(err.response);
      })
  }
}