import PropTypes from 'prop-types';
import React from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../style/musicCards.css';

export default class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  setFavorite = async ({ target }) => {
    const { music, getfavorites } = this.props;
    console.log(target.checked);
    this.setState({ loading: true });
    if (target.checked === false) {
      await removeSong(music);
    } else {
      await addSong(music);
    }
    this.setState({
      loading: false,
    });
    getfavorites(); // Sem usar essa função que atualiza o state com a lista de favoritos no Album não funciona pq em checkFavorite() o favoriteSongs que vem por props é estático
  }

  checkFavorite = (trackId) => {
    const { favoriteSongs } = this.props;
    if (favoriteSongs.length > 0) {
      console.log(favoriteSongs);
      return favoriteSongs.some((track) => track.trackId === trackId);
    }
    return false;
  }

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { loading } = this.state;
    return (
      <div>
        { loading
          ? <Loading />
          : (
            <div>
              <span>{trackName}</span>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              <label htmlFor="favorite">
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  type="checkbox"
                  name="favorite"
                  onChange={ this.setFavorite }
                  checked={ this.checkFavorite(trackId) }
                  id="favorite" // Não estava passando no teste pq o htmlFor conecta com is e não name. Ajuda na mentoria com o Gabriel.
                />
              </label>
            </div>
          )}
      </div>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;
