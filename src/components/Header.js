import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import { Navbar } from 'react-bootstrap';

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
          <header className="header-logged container-lg" data-testid="header-component">
            <Navbar className="d-flex align-item-center justify-content-around text-center" bg="info" variant="primary">
              <h3 data-testid="header-user-name" className="m-3 col ">{ name }</h3>
              <Link data-testid="link-to-search" to="/search" className="col">Search</Link>
              <Link data-testid="link-to-favorites" to="/favorites" className="col">Favorites</Link>
              <Link data-testid="link-to-profile" to="/profile" className="col">Profile</Link>
            </Navbar>
          </header>
        )
    );
  }
}

export default Header;
