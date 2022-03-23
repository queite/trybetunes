import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      name: '',
      email: '',
      image: '',
      description: '',
      isDisabled: false,
    };
  }

  componentDidMount() {
    this.handleUser();
  }

  handleUser = async () => {
    // this.setState({ loading: true });
    const user = await getUser(); // recupera valor do localStorage
    const { name, email, description, image } = user;
    this.setState({
      name,
      email,
      description,
      image,
      loading: false,
    });
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.handleValidation);
  }

  handleValidation = () => {
    const length = 0;
    const { name, email, description, image } = this.state;
    let valid = true;
    if (name.length > length
        && email.length > length
        && description.length > length
        && image.length > length
        && email.match(/^[a-z0-9]+@[a-z0-9]+\.[a-z]+/i)) {
      valid = false;
    }
    this.setState({ isDisabled: valid });
  }

  // Requisito 14 não passou no teste. Ajuda para resolver com o Gabriel na mentoria. Problema era com assincronicidade.
  handleSave = () => {
    this.setState({ loading: true }, async () => {
      const { name, email, description, image } = this.state;
      const obj = {
        name,
        email,
        image,
        description,
      };
      await updateUser(obj);
    });
    console.log(this.props);
    this.setState({ loading: false }, () => {
      const { history } = this.props;
      history.push('/profile');
    });
  }

  render() {
    const { loading, name, email, description, image, isDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading
          ? <Loading />
          : (
            <form>
              <label htmlFor="name">
                <input
                  name="name"
                  data-testid="edit-input-name"
                  value={ name }
                  type="text"
                  onChange={ this.handleInput }
                  id="name"
                />
              </label>
              <label htmlFor="email">
                <input
                  name="email"
                  data-testid="edit-input-email"
                  value={ email }
                  type="text"
                  onChange={ this.handleInput }
                  id="email"
                />
              </label>
              <label htmlFor="description">
                <textarea
                  name="description"
                  data-testid="edit-input-description"
                  value={ description }
                  onChange={ this.handleInput }
                  id="description"
                />
              </label>
              <label htmlFor="image">
                <input
                  name="image"
                  data-testid="edit-input-image"
                  value={ image }
                  type="text"
                  onChange={ this.handleInput }
                  id="image"
                />
              </label>
              <button
                data-testid="edit-button-save"
                disabled={ isDisabled }
                type="button"
                onClick={ this.handleSave }
              >
                Salvar
              </button>
            </form>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.object,
}.isRequired;
