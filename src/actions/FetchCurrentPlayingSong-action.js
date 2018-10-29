import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

export function fetchCurrentPlayingSong() {
  return function(dispatch) {
    dispatch({ type: "FETCH_CURRENT_PLAYING_SONG"})

    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        dispatch({ type: "FETCH_CURRENT_PLAYING_SONG_FULFILLED", payload: response.item.name})
      })
      .catch((err) => {
        dispatch({ type: "FETCH_CURRENT_PLAYING_SONG_REJECTED", payload: err})
      })

  }
}
