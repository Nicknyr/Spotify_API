import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRelatedArtists } from './actions/FetchCurrentPlaying-action';


class RelatedArtists extends Component {
  componentDidMount = () => {
    this.props.fetchRelatedArtists();
  }

  render(){
    /*const otherAlbumCovers = Object.entries(this.props.otherAlbums.albums).map((item, key) => {
      //console.log('item in otherAlbumCovers : ' + item[1].name);
      return (
        <div key={key}>
          <div>{item[1].name}</div>
          <div><img src={item[1].images[1].url} alt="album cover" style={{ height: 150 }}/></div>
        </div>
      );
    })
    */

    const relatedArtists = Object.entries(this.props.relatedArtists.relatedArtists).map((item, key) => {
      console.log(item[1].images[0].url);
      return (
        <div key={key}>
          <div>{item[1].name} : Popularity {item[1].popularity}</div>
          <img src={item[1].images[0].url} alt="album cover" style={{ height: 150 }}/>
        </div>
      );
    })

    return (
      <div>
        <h1>Related Artists</h1>
        {relatedArtists}
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => ({
  fetchRelatedArtists: () => dispatch(fetchRelatedArtists())
})

const mapStateToProps = state => ({
  relatedArtists: state.FetchRelatedArtistsReducer
})


export default connect(mapStateToProps, mapDispatchToProps)(RelatedArtists);
