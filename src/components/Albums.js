import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Albums extends React.Component {
  render() {
    const { albums, artist } = this.props;
    return (
      <div>
        { (albums.length === 0) ? <h1>Nenhum álbum foi encontrado</h1>
          : (
            <>
              <h2>
                {`Resultado de álbuns de: ${artist}`}
              </h2>
              { albums
                .map(({
                  artistName,
                  collectionId,
                  collectionName,
                  artworkUrl100,
                }) => (
                  <Link
                    data-testid={ `link-to-album-${collectionId}` }
                    to={ `/album/${collectionId}` }
                    key={ collectionId }
                  >
                    <div className="card">
                      <img
                        src={ artworkUrl100 }
                        alt={ collectionName }
                        className="card-img"
                      />
                      <h3 className="card-title">{collectionName}</h3>
                      <span className="cardDescribe">{artistName}</span>
                    </div>
                  </Link>
                ))}
            </>)}
      </div>
    );
  }
}

Albums.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  artist: PropTypes.string.isRequired,
};

export default Albums;
