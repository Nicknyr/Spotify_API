import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

export function fetchCurrentPlaying() {
  return function(dispatch) {
    dispatch({ type: "FETCH_CURRENT_PLAYING"})

    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        dispatch({ type: "FETCH_CURRENT_PLAYING_FULFILLED", payload: response.item.album})
        const id = response.item.album.artists[0].id;
        dispatch(fetchAlbumsByArtist(id))
      })
      .catch((err) => {
        dispatch({ type: "FETCH_CURRENT_PLAYING_REJECTED", payload: err})
      })

  }
}

export function fetchAlbumsByArtist(albumID) {
  return function(dispatch) {
  dispatch({ type: "FETCH_ALBUMS_BY_ARTIST"});

  spotifyApi.getArtistAlbums(albumID)
    .then((response) => {
      dispatch({ type: "FETCH_ALBUMS_BY_ARTIST_FULFILLED", payload: response})
    })
    .catch((err) => {
      dispatch({ type: "FETCH_ALBUMS_BY_ARTIST_REJECTED", payload: err})
    });
  }
}
