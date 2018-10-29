import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

/*export function fetchAlbums(id) {
  return function(dispatch, id) {
    console.log('id in fetchAlbums : ' + id);
    dispatch({ type: "FETCH_ALBUMS_BY_ARTIST"});

    //'43ZHCT0cAZBISjO8DG9PnE'
    spotifyApi.getArtistAlbums(id)
      .then((response) => {
        dispatch({ type: "FETCH_ALBUMS_BY_ARTIST_FULFILLED", payload: response})
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ALBUMS_BY_ARTIST_REJECTED", payload: err})
      });

  }
}



export const fetchAlbums = (id) => async dispatch => {
  dispatch({ type: "FETCH_ALBUMS_BY_ARTIST"});
  //console.log('id from fetchAlbums : ' + id);

  //'43ZHCT0cAZBISjO8DG9PnE'
  spotifyApi.getArtistAlbums(id)
    .then((response) => {
      dispatch({ type: "FETCH_ALBUMS_BY_ARTIST_FULFILLED", payload: response})
    })
    .catch((err) => {
      dispatch({ type: "FETCH_ALBUMS_BY_ARTIST_REJECTED", payload: err})
    });
}
*/
