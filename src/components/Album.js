import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      album: {},
      musics: [],
    };

    this.recoverMusics = this.recoverMusics.bind(this);
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

  render() {
    const { album, musics } = this.state;
    return (
      <div className="album" data-testid="page-album">
        <div className="album-info">
          <img src={ album.artworkUrl100 } alt={ album.collectionName } />
          <h3 data-testid="album-name">{album.collectionName}</h3>
          <h4 data-testid="artist-name">{album.artistName}</h4>
        </div>
        <div className="album-musics">
          {musics.map(({ trackName, previewUrl, trackId }) => (
            <div key={ trackId }>
              <span>{trackName}</span>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
            </div>
          ))}
        </div>
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
