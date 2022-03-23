import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      user: {},
    };
  }

  componentDidMount() {
    this.handleUser();
  }

  handleUser = async () => {
    this.setState({ loading: true });
    const user = await getUser(); // recupera valor do localStorage
    this.setState({
      user,
      loading: false,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading
          ? <Loading />
          : (
            <>
              <div className="user-container">
                <img src="url-to-image" alt="profile" data-testid="profile-image" />
                <h1>{user.name}</h1>
                <p>{ user.email }</p>
                <p>{ user.description }</p>
              </div>
              <Link to="/profile/edit">Editar perfil</Link>

            </>
          )}

      </div>
    );
  }
}
