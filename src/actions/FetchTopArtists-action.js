import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();


export function fetchTopArtists () {
  return function(dispatch) {
    dispatch({ type: "FETCH_TOP_ARTISTS"})

    spotifyApi.getMyTopArtists('https://api.spotify.com/v1/me/top/artists')
      .then((response) => {
        console.log('Top Artists response ' + response);
        dispatch({
          type: "FETCH_TOP_ARTISTS_FULFILLED",
          payload: response
        })
      })
      .catch((err) => {
        dispatch({
          type: "FETCH_TOP_ARTISTS_REJECTED",
          payload: err
        })
      })
  }
}
