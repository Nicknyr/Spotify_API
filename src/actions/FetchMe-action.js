import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

export function fetchMe() {
  return function(dispatch) {
    dispatch({ type: "FETCH_ME"})

    spotifyApi.getMe()
      .then((response) => {
        dispatch({
          type: "FETCH_ME_FULFILLED",
          payload: response
        })
      })
      .catch((err) => {
        dispatch({
          type: "FETCH_ME_REJECTED",
          payload: err
        })
      })
  }
}
