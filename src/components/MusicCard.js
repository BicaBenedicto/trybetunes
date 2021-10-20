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

  addFavoriteMusic(music) {
    const { loadScreen, loadFavoritesMusic } = this.props;
    loadScreen(true);
    addSong(music).then(() => {
      loadFavoritesMusic();
    });
  }

  removeFavoriteMusic(music) {
    const { loadScreen, loadFavoritesMusic } = this.props;
    loadScreen(true);
    removeSong(music).then(() => {
      loadFavoritesMusic();
    });
  }

  checkFavoriteMusic({ target }) {
    const { musics } = this.props;
    const { name, checked } = target;
    const music = musics.find(({ trackId }) => trackId === Number(name));
    if (checked) this.addFavoriteMusic(music);
    else this.removeFavoriteMusic(music);
  }

  render() {
    const { musics, favorites } = this.props;
    return (musics.map(({ trackName, previewUrl, trackId }) => (
      <div key={ trackId }>
        <span>{ trackName }</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            className="favorite-icon"
            onChange={ this.checkFavoriteMusic }
            checked={ favorites.some((favorite) => favorite.trackId === trackId) }
            name={ trackId }
          />
        </label>
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
