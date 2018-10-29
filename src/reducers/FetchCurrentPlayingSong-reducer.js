
export default function reducer (state = {
  song: '',
  fetching: false,
  fetched: false,
  error: null
}, action) {

  switch(action.type) {
    case "FETCH_CURRENT_PLAYING_SONG": {
      return {...state, fetching: true}
    }
    case "FETCH_CURRENT_PLAYING_SONG_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_CURRENT_PLAYING_SONG_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        song: action.payload
      }
    }
    default: return state;
  }
}
