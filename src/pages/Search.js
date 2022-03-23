import React from 'react';
import { FaSearch } from 'react-icons/fa';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../style/search.css';

export default class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      artistName: '',
      loading: false,
      savedArtist: '',
      albuns: [],
    };
  }

  handleInput = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value }, () => {
      if (value.length >= 2) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  handleClick = async () => {
    const { artistName } = this.state;
    this.setState({
      loading: true,
      savedArtist: artistName,
    });
    const albuns = await searchAlbumsAPI(artistName);
    this.setState({
      artistName: '',
      loading: false,
      albuns,
    });
  }

  render() {
    const { isDisabled, artistName, loading, savedArtist, albuns } = this.state;
    return (
      <div>
        <Header />
        <div className="page-search">
          {
            loading
              ? <Loading />
              : (
                <div>
                  <input
                    data-testid="search-artist-input"
                    type="text"
                    onChange={ this.handleInput }
                    name="artistName"
                    value={ artistName }
                  />
                  <button
                    data-testid="search-artist-button"
                    type="button"
                    disabled={ isDisabled }
                    onClick={ this.handleClick }
                  >
                    <FaSearch />
                  </button>
                  <p>{`Resultado de álbuns de: ${savedArtist}`}</p>
                  <div className="search-result">
                    { albuns.length === 0
                      ? <p>Nenhum álbum foi encontrado</p>
                      : albuns.map((album) => (
                        <AlbumCard album={ album } key={ album.collectionId } />
                      ))}
                  </div>
                </div>
              )
          }
        </div>

      </div>
    );
  }
}
