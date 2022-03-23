import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import '../style/album.css';
import Loading from '../components/Loading';

export default class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      artistName: '',
      collectionName: '',
      artworkUrl100: '',
      favoriteSongs: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.musics();
    this.getfavorites();
  }

  // Imar Mendes me ajudou com o código
  musics = async () => {
    const { match: { params: { id } } } = this.props; // id é de /album/:id
    const musics = await getMusics(id);
    const { artistName, collectionName, artworkUrl100 } = musics[0];
    this.setState({
      musics: musics.filter((music) => music.kind === 'song'),
      artistName,
      collectionName,
      artworkUrl100,
    });
  }

  getfavorites = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs(); // recupera valor do localStorage
    this.setState({
      favoriteSongs: favorites,
      loading: false,
    });
  }

  render() {
    const { musics, artistName, collectionName, artworkUrl100,
      loading, favoriteSongs } = this.state;
    console.log(favoriteSongs);
    return (
      <div data-testid="page-album">
        <Header />
        <div className="player-container">
          { loading
            ? <Loading />
            : (
              <>
                <div>
                  <h2 data-testid="artist-name">{ artistName }</h2>
                  <h3 data-testid="album-name">{collectionName}</h3>
                  <img src={ artworkUrl100 } alt={ collectionName } />
                </div>
                <div className="music-container">
                  {
                    musics.map((music) => (
                      <MusicCard
                        key={ music.trackId }
                        music={ music }
                        favoriteSongs={ favoriteSongs }
                        getfavorites={ this.getfavorites }
                      />
                    ))
                  }
                </div>
              </>
            )}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
}.isRequired;
