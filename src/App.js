import React, { Component } from 'react';
import './App.scss';
import { connect } from 'react-redux';
import { fetchAlbumsByArtist } from './actions/FetchCurrentPlaying-action';
import { fetchCurrentPlaying } from './actions/FetchCurrentPlaying-action';
import { fetchCurrentPlayingSong } from './actions/FetchCurrentPlayingSong-action';
import { fetchTopArtists } from './actions/FetchTopArtists-action';
import jsonQuery from 'json-query';
//import {bindActionCreators, compose, applyMiddleware, createStore} from 'redux';
//import thunk from 'redux-thunk';


import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(props) {
    super(props);

    const params = this.getHashParams();
    const token = params.access_token;

    if (token) {
      spotifyApi.setAccessToken(token);
    }

    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '', ID: ''},
      albums: []
    };

  }


  getHashParams = () => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }



/*  getTopArtists = () => {
    spotifyApi.getMyTopArtists()
      .then((response) => {
        console.log('Top artists : ' + response);
      })
      .catch((err) => {
        console.log('top artists : ' + err);
      })
  }


    searchSongs = () => {
  // search tracks whose name, album or artist contains 'Love'
    spotifyApi.searchTracks('Love')
      .then((response) => {
        console.log('Search by "Love"', response);
      })
      .catch((err) => {
        console.error('search error : ' + err);
      });
    }



/*  componentDidUpdate = (prevProps, prevState) => {
    //console.log('prevProps and prevState ' + prevProps, prevState);
    //console.log(prevState.nowPlaying.name);
    //console.log('prevProps ' + prevProps);
    //console.log('prevstate ' + prevState);

    if(prevState.nowPlaying !== this.state.nowPlaying) {
      spotifyApi.getMyCurrentPlaybackState()
        .then((response) => {
          this.setState({
            nowPlaying: {
                name: response.item.name,
                albumArt: response.item.album.images[0].url,
                artist: response.item.artists[0].name
            }
          });
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
*/


  componentDidMount = () => {
    this.props.fetchCurrentPlaying();
    this.props.fetchCurrentPlayingSong();
    this.props.fetchTopArtists();
  }


  render() {
    const album = this.props.currentlyPlaying.album;
    const cover = this.props.currentlyPlaying.cover;
    const artist = this.props.currentlyPlaying.artist;
    const song = this.props.currentSong.song;

    const otherAlbumCovers = Object.entries(this.props.otherAlbums.albums).map(item => {
      return (
        <div>
          <div>{item[1].name}</div>
          <div><img src={item[1].images[1].url} alt="album cover" style={{ height: 150 }}/></div>
        </div>
      );
    })

    console.log(otherAlbumCovers);

    return (
      <div className="App">
        {this.state.loggedIn === false ?
          <a href="http://localhost:8888">
            <button>Login with Spotify</button>
          </a>
        :null}

        <div>
         Now Playing: {song} by {artist}
        </div>

        { this.state.nowPlaying.name == null ?
          <h1>Commercial</h1>
        : null}

        <div>
          <img src={cover} style={{ height: 150 }} alt="Album cover"/>
        </div>

        <div className="albums">
          <h2>Other Albums by {artist}</h2>
          {otherAlbumCovers}
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCurrentPlaying: () => dispatch(fetchCurrentPlaying()),
  fetchCurrentPlayingSong: () => dispatch(fetchCurrentPlayingSong()),
  fetchTopArtists: (token) => dispatch(fetchTopArtists(token))
})

const mapStateToProps = state => ({
  otherAlbums: state.FetchAlbumsReducer,
  currentlyPlaying: state.FetchCurrentPlayingReducer,
  currentSong: state.FetchCurrentPlayingSongReducer,
  topArtists: state.FetchTopArtists
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
