
export default function reducer(state = {
  artists: '',
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch(action.type) {
    case "FETCH_TOP_ARTISTS": {
      return {
        ...state,
        fetching: true
      }
    }
    case "FETCH_TOP_ARTISTS_REJECTED": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }
    case "FETCH_TOP_ARTISTS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        artists: action.payload
      }
    }
    default: return state;
  }
}
