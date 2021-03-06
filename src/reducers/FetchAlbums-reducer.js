
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
      //console.log('action.payload in reducer ' + action.payload.items);
      return {
        ...state,
        fetching: false,
        fetched: true,
        //albums: action.payload.items[0].name
        albums: action.payload.items
      }
    }
    default: return state;
  }
  //return state;
}
