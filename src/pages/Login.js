import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../style/login.css';
import logo from '../img/trybetunes.png';

export default class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      loginInput: '',
      isDisabled: true,
      loading: false,
      redirectTo: null,
    };
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    const minLength = 3;

    this.setState({ [name]: value }, () => {
      if (value.length >= minLength) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  handleLogin = async () => {
    const { loginInput } = this.state;
    this.setState({ loading: true });
    await createUser({ name: loginInput });
    this.setState({
      loading: false,
      redirectTo: '/search',
    });
  }

  render() {
    const { loading, redirectTo, loginInput, isDisabled } = this.state;
    return (
      <div className="login-container">
        {
          loading
            ? <Loading className="loading" />
            : (
              <div data-testid="page-login" className="login">
                <img src={ logo } alt="headphone" />
                <input
                  data-testid="login-name-input"
                  type="text"
                  name="loginInput"
                  onChange={ this.handleInput }
                  value={ loginInput }
                  placeholder="Nome"
                />
                <button
                  data-testid="login-submit-button"
                  type="button"
                  disabled={ isDisabled }
                  onClick={ this.handleLogin }
                >
                  Entrar
                </button>
              </div>
            )
        }
        { redirectTo && <Redirect to={ redirectTo } /> }
      </div>
    );
  }
}

Login.propTypes = {
  handleInput: PropTypes.func,
  loginInput: PropTypes.string,
}.isRequired;

// Ajuda com Redirect: https://kosmicke.medium.com/reactjs-servi%C3%A7os-b90037e5790f#:~:text=Outra%20maneira%20de%20fazer%20o,como%20se%20fosse%20um%20componente.
