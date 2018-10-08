import React, { Component } from 'react';
import './App.scss';

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

  componentDidMount = () => {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
              name: response.item.name,
              albumArt: response.item.album.images[0].url,
              artist: response.item.artists[0].name,
              ID: response.item.artists[0].id
            }
        });
        this.getAlbums();
        //this.getTopArtists();
        this.searchSongs();
      })

      spotifyApi.getMyTopArtists()
        .then((response) => {
          console.log('Top artists : ' + response);
        })
        .catch((err) => {
          console.log('top artists : ' + err);
        })

  }

  getAlbums = () => {
    spotifyApi.getArtistAlbums(this.state.nowPlaying.ID)
      .then((response) => {
        this.setState({
          //albums: response.items[0].name
          albums: response.items
        })
      })
      .catch((err) => {
        console.log(err);
      });
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
*/

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


  render() {

    const items = this.state.albums;

    const info = items.map((item, key) => {
              const names = item.name;
              const dates = item.release_date;
              const images = item.images[1].url;

              return (
                <div key={key}>
                  {names} <br/>
                  {dates} <br/>
                  <img src ={images} alt="Album cover"/>
                </div>
              );
    })


    return (
      <div className="App">

        {this.state.loggedIn == false ?
          <a href="http://localhost:8888">
            <button>Login with Spotify</button>
          </a>
        :null}

        <div>
          Now Playing: { this.state.nowPlaying.name } by {this.state.nowPlaying.artist}
        </div>

        { this.state.nowPlaying.name == null ?
          <h1>Commercial</h1>
        : null}

        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
        </div>

        <div className="albums">
          <h2>Other Albums by {this.state.nowPlaying.artist }</h2>
          {info}
        </div>

      </div>
    );
  }
}

export default App;
