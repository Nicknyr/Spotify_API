
export default function reducer (state = {
  albums: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {

  switch(action.type) {
    case "FETCH_ALBUMS_BY_ARTIST": {
      return {...state, fetching: true}
    }
    case "FETCH_ALBUMS_BY_ARTIST_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_ALBUMS_BY_ARTIST_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        albums: action.payload
      }
    }
    default: return state;
  }
  //return state;
}
