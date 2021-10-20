import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.addFavoriteMusic = this.addFavoriteMusic.bind(this);
    this.removeFavoriteMusic = this.removeFavoriteMusic.bind(this);
    this.checkFavoriteMusic = this.checkFavoriteMusic.bind(this);
  }

  addFavoriteMusic(trackId) {
    const { loadScreen, loadFavoritesMusic } = this.props;
    loadScreen(true);
    addSong(trackId).then(() => {
      loadFavoritesMusic();
    });
  }

  removeFavoriteMusic(trackId) {
    const { loadScreen, loadFavoritesMusic } = this.props;
    loadScreen(true);
    removeSong(trackId).then(() => {
      loadFavoritesMusic();
    });
  }

  checkFavoriteMusic({ target }) {
    const { name, checked } = target;
    if (checked) this.addFavoriteMusic(name);
    else this.removeFavoriteMusic(name);
  }

  render() {
    const { musics, favorites } = this.props;
    console.log(favorites);
    return (musics.map(({ trackName, previewUrl, trackId }) => (
      <div key={ trackId }>
        <span>{ trackName }</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <input
          data-testid={ `checkbox-music-${trackId}` }
          type="checkbox"
          className="favorite-icon"
          onChange={ this.checkFavoriteMusic }
          checked={ favorites.some((favorite) => favorite === trackId.toString()) }
          name={ trackId }
        />
      </div>
    )));
  }
}

MusicCard.propTypes = {
  loadScreen: PropTypes.func.isRequired,
  musics: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadFavoritesMusic: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MusicCard;
