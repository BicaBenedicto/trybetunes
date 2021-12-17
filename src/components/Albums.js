import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

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
              <div className="d-flex flex-wrap w-100 justify-content-around card-list">
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
                      <Card className="card m-3" style={{ width: '18rem', borderRadius: '20px' }}>
                        <Card.Img
                          src={ artworkUrl100 }
                          alt={ collectionName }
                          className="card-img"
                          variant="top"
                          style={{ borderRadius: '20px' }}
                        />
                        <Card.Body>
                          <Card.Title className="card-title">{collectionName}</Card.Title>
                          <Card.Text className="cardDescribe">{artistName}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  ))}
                </div>
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
