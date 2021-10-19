import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      load: true,
    };

    this.recoverUser = this.recoverUser.bind(this);
  }

  componentDidMount() {
    this.recoverUser();
  }

  recoverUser() {
    getUser().then((response) => (
      this.setState({
        name: response.name,
        load: false,
      })));
  }

  render() {
    const { name, load } = this.state;
    return (
      load ? <Loading />
        : (
          <header className="header-logged" data-testid="header-component">
            <h2 data-testid="header-user-name">{ name }</h2>
            <div>
              <Link data-testid="link-to-search" to="/search">Search</Link>
              <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
              <Link data-testid="link-to-profile" to="/profile">Profile</Link>
            </div>
          </header>
        )
    );
  }
}

export default Header;
