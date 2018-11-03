import React, { Component } from 'react';
import './App.scss';
import NowPlaying from './NowPlaying.js';
import SpotifyWebApi from 'spotify-web-api-js';
import RelatedArtists from './RelatedArtists.js';

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

  render() {
    return (
      <div className="App">
        {this.state.loggedIn === false ?
          <a href="http://localhost:8888">
            <button>Login with Spotify</button>
          </a>
        :null}

        { this.state.nowPlaying.name == null ?
          <h1>Commercial</h1>
        : null}

        <NowPlaying/>
        <RelatedArtists/>

      </div>
    );
  }
}


export default App;
