import { combineReducers } from 'redux';
import FetchAlbumsReducer from './FetchAlbums-reducer';
import FetchCurrentPlayingReducer from './FetchCurrentPlaying-reducer';
import FetchCurrentPlayingSongReducer from './FetchCurrentPlayingSong-reducer';
import FetchTopArtistReducer from './FetchTopArtists-reducer.js';


export default combineReducers({
    FetchAlbumsReducer,
    FetchCurrentPlayingReducer,
    FetchCurrentPlayingSongReducer,
    FetchTopArtistReducer
})
