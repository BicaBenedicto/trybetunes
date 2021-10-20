import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Header from './Header';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      load: false,
    };
  }

  componentDidMount() {
    this.recoverUser();
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
    const { load, name, email, image, description } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          {load ? <Loading />
            : (
              <div>
                <div>
                  <img data-testid="profile-image" src={ image } alt={ name } />
                  <Link to="/profile/edit">Editar perfil</Link>
                </div>
                <h1>
                  { name }
                </h1>
                <h2>
                  {email}
                </h2>
                <h2>
                  {description}
                </h2>
              </div>
            )}
        </div>
      </>
    );
  }
}

export default Profile;
