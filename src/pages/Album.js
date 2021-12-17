import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { Card } from 'react-bootstrap';

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
      <div className="album d-flex w-100 flex-column align-items-center" data-testid="page-album">
        {load ? <Loading /> : (
          <>
            <Card className="album-info p-2">
              <Card.Img src={ album.artworkUrl100 } alt={ album.collectionName } />
              <Card.Title className="p-2" data-testid="album-name">{album.collectionName}</Card.Title>
              <Card.Text className="p-2" data-testid="artist-name">{album.artistName}</Card.Text>
            </Card>
            <div className="album-musics d-flex flex-wrap w-100 align-items-center justify-content-around">
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
