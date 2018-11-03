import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentPlaying } from './actions/FetchCurrentPlaying-action';
import { fetchCurrentPlayingSong } from './actions/FetchCurrentPlayingSong-action';
import { fetchTopArtists } from './actions/FetchTopArtists-action';
import { fetchMe } from './actions/FetchMe-action';

class NowPlaying extends Component {
  componentDidMount = () => {
    this.props.fetchCurrentPlaying();
    this.props.fetchCurrentPlayingSong();
    this.props.fetchTopArtists();
    this.props.fetchMe();
  }

  render() {
    const cover = this.props.currentlyPlaying.cover;
    const artist = this.props.currentlyPlaying.artist;
    const song = this.props.currentSong.song;

    const otherAlbumCovers = Object.entries(this.props.otherAlbums.albums).map((item, key) => {
      //console.log('item in otherAlbumCovers : ' + item[1].name);
      return (
        <div key={key}>
          <div>{item[1].name}</div>
          <div><img src={item[1].images[1].url} alt="album cover" style={{ height: 150 }}/></div>
        </div>
      );
    })

    return (
      <div className="App">
        <div>
         Now Playing: {song} by {artist}
        </div>

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
  fetchTopArtists: (token) => dispatch(fetchTopArtists(token)),
  fetchMe: () => dispatch(fetchMe())
})

const mapStateToProps = state => ({
  otherAlbums: state.FetchAlbumsReducer,
  currentlyPlaying: state.FetchCurrentPlayingReducer,
  currentSong: state.FetchCurrentPlayingSongReducer,
  topArtists: state.FetchTopArtists,
  userInfo: state.FetchMe
})

export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying);
