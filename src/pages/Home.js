import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import { FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap';

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
    this.setState({
      login: true,
    });
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
      <div data-testid="page-login" className="login container p-5 rounded-circle">
        { login && <Redirect to="/search" /> }
        { loading ? <Loading />
          : (
            <form className='d-flex flex-column align-items-center'>
              <FormGroup className='mb-3' controlId="formBasicTitle">
                <h2 className="text-center fw-bold">
                  Login
                </h2>
              </FormGroup>
              <FormGroup className='mb-3' controlId="formBasicEmail">
                <FormLabel htmlFor="input-login">
                  <FormControl
                    id="input-login"
                    type="text"
                    className="login"
                    data-testid="login-name-input"
                    name="name"
                    value={ name }
                    onChange={ this.onInputChange }
                    placeholder='Seu nome'
                  />
                </FormLabel>
              </FormGroup>
              <FormGroup className='' controlId="formBasicLoginButton">
                <Button
                  type="submit"
                  className="button-login"
                  data-testid="login-submit-button"
                  disabled={ buttonDisable }
                  onClick={ this.onButtonClick }
                  variant="primary"
                  size="lg"
                >
                  Entrar
                </Button>
              </FormGroup>
            </form>
          )}
      </div>
    );
  }
}

export default Home;
