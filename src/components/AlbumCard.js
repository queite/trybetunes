import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../style/albumCard.css';

export default class AlbumCard extends React.Component {
  render() {
    const { album:
      { collectionId, artistName, collectionName, artworkUrl100 } } = this.props;
    return (
      <div className="container">
        <h1>{artistName}</h1>
        <h2>{collectionName}</h2>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <div>
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          >
            Ver
          </Link>
        </div>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionName: PropTypes.string,
  collectionId: PropTypes.number,
}.isRequired;
