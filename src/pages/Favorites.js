import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.getfavorites();
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
    const { loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading
          ? <Loading />
          : (
            <div className="music-container">
              {
                favoriteSongs.map((song) => (
                  <MusicCard
                    key={ song.trackId }
                    getfavorites={ this.getfavorites }
                    music={ song }
                    favoriteSongs={ favoriteSongs }
                  />
                ))
              }
            </div>
          )}
      </div>
    );
  }
}
