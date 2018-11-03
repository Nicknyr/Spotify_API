
export default function reducer(state = {
  relatedArtists: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch(action.type) {
    case "FETCH_RELATED_ARTISTS": {
      return {
        ...state,
        fetching: true
      }
    }
    case "FETCH_RELATED_ARTISTS_REJECTED": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }
    case "FETCH_RELATED_ARTISTS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        relatedArtists: action.payload.artists
      }
    }
    default: return state;
  }
}
