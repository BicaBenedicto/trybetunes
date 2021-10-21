import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      load: false,
      buttonDisable: false,
      redirect: false,
    };

    this.loginValidate = this.loginValidate.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  componentDidMount() {
    this.recoverUser();
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.setState({
      buttonDisable: this.loginValidate(),
    }));
  }

  async onButtonClick(event) {
    event.preventDefault();
    const { name, email, description, image } = this.state;
    this.setState({
      load: true,
    });
    await updateUser({ name, email, description, image });
    this.setState({
      redirect: true,
    });
  }

  loginValidate() {
    const { name, email, description, image } = this.state;
    const minLength = 3;

    if (name.length < minLength) return true;
    if (description.length < minLength) return true;
    if (name.length < minLength) return true;
    if (image < minLength) return true;
    if (email.length < minLength && !email.includes('@')) return true;
    return false;
  }

  recoverUser() {
    this.setState({ load: true });
    getUser().then(({
      name,
      email,
      image,
      description,
    }) => {
      this.setState({
        name,
        email,
        image,
        description,
        load: false,
      });
    });
  }

  render() {
    const { load, name, email, image, description, buttonDisable, redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        {redirect && <Redirect to="/profile" />}
        {load ? <Loading />
          : (
            <div>
              <label htmlFor="edit-input-name">
                Nome:
                <input
                  id="edit-input-name"
                  data-testid="edit-input-name"
                  type="text"
                  name="name"
                  value={ name }
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="edit-input-email">
                Email:
                <input
                  id="edit-input-email"
                  data-testid="edit-input-email"
                  type="email"
                  name="email"
                  value={ email }
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="edit-input-description">
                Descrição:
                <input
                  id="edit-input-description"
                  data-testid="edit-input-description"
                  type="text"
                  name="description"
                  value={ description }
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="edit-input-image">
                Image:
                <input
                  id="edit-input-image"
                  data-testid="edit-input-image"
                  type="text"
                  name="image"
                  value={ image }
                  onChange={ this.onInputChange }
                />
              </label>
              <button
                data-testid="edit-button-save"
                type="submit"
                disabled={ buttonDisable }
                onClick={ this.onButtonClick }
              >
                Salvar
              </button>
            </div>
          )}
      </div>
    );
  }
}

export default ProfileEdit;
