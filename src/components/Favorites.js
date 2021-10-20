import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favorites: [],
      load: false,
    };

    this.loadFavoritesMusic = this.loadFavoritesMusic.bind(this);
    this.loadScreen = this.loadScreen.bind(this);
  }

  componentDidMount() {
    this.loadFavoritesMusic();
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

  loadScreen(checked) {
    this.setState({ load: checked });
  }

  render() {
    const { favorites, load } = this.state;
    return (
      <div data-testid="page-favorites">
        {load ? <Loading />
          : (
            <div>
              <MusicCard
                musics={ favorites }
                favorites={ favorites }
                loadFavoritesMusic={ this.loadFavoritesMusic }
                loadScreen={ this.loadScreen }
              />
            </div>
          )}
      </div>
    );
  }
}

export default Favorites;
