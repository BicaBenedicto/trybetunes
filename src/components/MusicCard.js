import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.addOrRemoveFavoriteMusic = this.addOrRemoveFavoriteMusic.bind(this);
  }

  addOrRemoveFavoriteMusic({ target }) {
    const { loadScreen, favoriteChecked } = this.props;
    const { name, checked } = target;
    loadScreen(true);
    favoriteChecked(target);
    if (checked) {
      return addSong(name).then(() => loadScreen(false));
    }
    return removeSong(name).then(() => loadScreen(false));
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
        <input
          data-testid={ `checkbox-music-${trackId}` }
          type="checkbox"
          className="favorite-icon"
          onChange={ this.addOrRemoveFavoriteMusic }
          checked={ favorites.some((favorite) => favorite[trackId]) }
          name={ trackId }
        />
      </div>
    )));
  }
}

MusicCard.propTypes = {
  loadScreen: PropTypes.func.isRequired,
  musics: PropTypes.arrayOf(PropTypes.object).isRequired,
  favoriteChecked: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
