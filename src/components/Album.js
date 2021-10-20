import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      album: {},
      musics: [],
      load: false,
      favorites: [],
    };

    this.recoverMusics = this.recoverMusics.bind(this);
    this.loadScreen = this.loadScreen.bind(this);
    this.favoriteChecked = this.favoriteChecked.bind(this);
  }

  componentDidMount() {
    this.recoverMusics();
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

  favoriteChecked(target) {
    const { name, checked } = target;
    this.setState((prevState) => ({
      favorites: [...prevState.favorites, { [name]: checked }],
    }));
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
                favoriteChecked={ this.favoriteChecked }
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
