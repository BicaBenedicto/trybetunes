import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import Albums from './Albums';
import { Button, FormControl } from 'react-bootstrap';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      searched: '',
      buttonDisable: true,
      load: false,
      albums: [],
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonSubmit = this.onButtonSubmit.bind(this);
  }

  onInputChange({ target }) {
    const { value } = target;
    this.setState({
      search: value,
      buttonDisable: (value.length < 2),
    });
  }

  onButtonSubmit(event) {
    const { search } = this.state;
    event.preventDefault();

    this.setState((prevState) => ({
      searched: prevState.search,
      search: '',
      load: true,
    }));
    searchAlbumsAPI(search).then((response) => (
      this.setState({
        load: false,
        albums: response,
      })));
  }

  render() {
    const { search, buttonDisable, load, albums, searched } = this.state;
    return (
      <div data-testid="page-search" className='container d-flex flex-column align-items-center'>
        {load ? <Loading />
          : (
            <div className='d-flex flex-row align-items-center w-100 mb-5'>
              <FormControl
                data-testid="search-artist-input"
                type="text"
                placeholder="Nome do Artista ou Album"
                value={ search }
                onChange={ this.onInputChange }
                className='w-100 p-2'
              />
              <Button
                data-testid="search-artist-button"
                type="submit"
                disabled={ buttonDisable }
                onClick={ this.onButtonSubmit }
                className='p-2'
                size="lg"
              >
                Pesquisar
              </Button>
            </div>
          )}
        {albums && <Albums artist={ searched } albums={ albums } />}
      </div>
    );
  }
}

export default Search;
