import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      album: {},
      musics: [],
      load: true,
      favorites: [],
    };

    this.recoverMusics = this.recoverMusics.bind(this);
    this.loadScreen = this.loadScreen.bind(this);
    this.loadFavoritesMusic = this.loadFavoritesMusic.bind(this);
  }

  componentDidMount() {
    this.loadFavoritesMusic();
    this.recoverMusics();
  }

  loadFavoritesMusic() {
    this.setState(() => ({
      load: true,
    }));
    getFavoriteSongs().then((favoriteList) => {
      this.setState(() => ({
        favorites: favoriteList,
        load: false,
      }));
    });
  }

  recoverMusics() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    getMusics(id).then((response) => (
      this.setState({
        album: response[0],
        musics: response
          .filter(({ previewUrl }) => previewUrl)
          .map(({ previewUrl, trackName, trackId }) => (
            { trackName, previewUrl, trackId }
          )),
      })
    ));
  }

  loadScreen(checked) {
    this.setState({ load: checked });
  }

  render() {
    const { album, musics, load, favorites } = this.state;
    return (
      <div className="album" data-testid="page-album">
        {load ? <Loading /> : (
          <>
            <div className="album-info">
              <img src={ album.artworkUrl100 } alt={ album.collectionName } />
              <h3 data-testid="album-name">{album.collectionName}</h3>
              <h4 data-testid="artist-name">{album.artistName}</h4>
            </div>
            <div className="album-musics">
              <MusicCard
                musics={ musics }
                addOrRemoveFavoriteMusic={ this.addOrRemoveFavoriteMusic }
                loadScreen={ this.loadScreen }
                loadFavoritesMusic={ this.loadFavoritesMusic }
                favorites={ favorites }
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape(PropTypes.string).isRequired,
  }).isRequired,
};

export default Album;
