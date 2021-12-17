import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Header from '../components/Header';
import userImage from '../images/user-empty.png';
import { Card } from 'react-bootstrap';

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
              <div className='d-flex flex-column align-items-center justify-content-around'>
                <Card className='d-flex flex-column align-items-center'>
                  <Card.Img
                    data-testid="profile-image"
                    src={ image ? image : userImage }
                    alt={ name }
                  />
                  <Link to="/profile/edit" className="edit-perfil">Editar perfil</Link>
                </Card>
                <span className="p-3 f-18px">
                  { name }
                </span>
                <span className="p-3 f-18px">
                  {email}
                </span>
                <span className="p-3 f-18px">
                  {description}
                </span>
              </div>
            )}
        </div>
      </>
    );
  }
}

export default Profile;
