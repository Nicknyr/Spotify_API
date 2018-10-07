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
      })
  }

  getAlbums = () => {
    spotifyApi.getArtistAlbums(this.state.nowPlaying.ID)
      .then((response) => {
        console.log(response);

    //    const x = response.items;

/*        const albumNames = x.map(item => {
                        Object.keys(item).map(item2 => {
                          //console.log('item2 ' + item2.release_date);
                          Object.keys(item2).map(item3 => {
                            //console.log('item3 ' + item3);
                          })
                        })
                        return item.name
        });

        const releaseDates = x.map(item => {
                          return item.release_date;
        })

        console.log('release dates: ' + releaseDates);

        const before = albumNames;
        console.log('before ' + before);
        const {items, name} = before;

        const {images} = response.items.images;
        //console.log('images : ' + images);

        console.log('Destructured : name ' + {name});
*/
        this.setState({
          //albums: response.items[0].name
          albums: response.items
        })
      })
      .catch((err) => {
        console.log(err);
      });



  }


/*  componentDidUpdate = (prevProps, prevState) => {
    console.log('prevProps and prevState ' + prevProps, prevState);
    console.log(prevState.nowPlaying.name);

    if(prevState.nowPlaying.name !== this.state.nowPlaying.name) {
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
    }
  }
*/


  render() {

    const items = this.state.albums;
/*    const albumNames = items.map(item => {
                    return <div>{item.name}</div>
    });

    const image = items.map(item => {
                    item.images.map(item2 => {
                      //console.log('item ' + item2)
                        //console.log(Object.keys(item2));
                      Object.keys(item).map((item3, key) => {
                        //console.log(item3.image)
                      })
                    })
                  })


  //  console.log('images ' + image);
  */


  const info = items.map(item => {
              const names = item.name;
              const dates = item.release_date;
              const images = item.images[1].url;

              return (
                <div>
                  {names} <br/>
                  {dates} <br/>
                <img src ={images} />
                </div>
              );
  })


    return (
      <div className="App">

        <a href="http://localhost:8888">
          <button>Login with Spotify</button>
        </a>

        <div>
          Now Playing: { this.state.nowPlaying.name } by {this.state.nowPlaying.artist}
        </div>
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
