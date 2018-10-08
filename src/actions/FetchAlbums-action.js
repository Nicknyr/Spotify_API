import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

export function fetchAlbums() {
  return function(dispatch) {
    dispatch({ type: "FETCH_ALBUMS_BY_ARTIST"});

    spotifyApi.getArtistAlbums(this.state.nowPlaying.ID)
      .then((response) => {
        dispatch({ type: "FETCH_ALBUMS_BY_ARTIST_FULFILLED", payload: response})
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ALBUMS_BY_ARTIST_REJECTED", payload: err})
      });

  }
}
