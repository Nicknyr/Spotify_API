
export default function reducer (state = {
  artist: '',
  album: '',
  cover: '',
  id: '',
  fetching: false,
  fetched: false,
  error: null
}, action) {

  switch(action.type) {
    case "FETCH_CURRENT_PLAYING": {
      return {...state, fetching: true}
    }
    case "FETCH_CURRENT_PLAYING_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_CURRENT_PLAYING_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        artist: action.payload.artists[0].name,
        album: action.payload.name,
        cover: action.payload.images[1].url,
        id: action.payload.artists[0].id
      }
    }
    default: return state;
  }
}
