import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      buttonDisable: true,
      login: false,
      loading: false,
    };

    this.loginValidate = this.loginValidate.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onInputChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.loginValidate);
  }

  async onButtonClick() {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name });
    // this.setState({
    //   login: true,
    // });
  }

  loginValidate() {
    const { name } = this.state;
    const minLength = 3;
    this.setState({
      buttonDisable: (name.length < minLength),
    });
  }

  render() {
    const { name, buttonDisable, login, loading } = this.state;

    return (
      <div data-testid="page-login">
        { login && <Redirect to="/search" /> }
        { loading ? <Loading />
          : (
            <form>
              <header>
                Login
              </header>
              <label htmlFor="input-login">
                <input
                  id="input-login"
                  type="text"
                  className="login"
                  data-testid="login-name-input"
                  name="name"
                  value={ name }
                  onChange={ this.onInputChange }
                />
                <button
                  type="submit"
                  className="button-login"
                  data-testid="login-submit-button"
                  disabled={ buttonDisable }
                  onClick={ this.onButtonClick }
                >
                  Entrar
                </button>
              </label>
            </form>
          )}
      </div>
    );
  }
}

export default Home;
