import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { getUser } from '../services/userAPI';
import '../style/header.css';

export default class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
    };
  }

  async componentDidMount() {
    const user = await getUser();
    if (user) {
      this.setState({
        userName: user.name,
      });
    }
  }

  render() {
    const { userName } = this.state;
    return (
      <div>
        (
        <header className="header-component">
          <nav>
            <Link to="/search" data-testid="link-to-search">Busca</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </nav>
          <div className="user-container">
            <FaRegUserCircle />
            <p data-testid="header-user-name">{ userName }</p>
          </div>
        </header>
        )
      </div>

    );
  }
}
