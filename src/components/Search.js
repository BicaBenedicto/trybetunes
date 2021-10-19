import React from 'react';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      buttonDisable: true,
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange({ target }) {
    const { value } = target;
    this.setState({
      search: value,
      buttonDisable: (value.length < 2),
    });
  }

  render() {
    const { search, buttonDisable } = this.state;
    return (
      <div data-testid="page-search">
        <input
          data-testid="search-artist-input"
          type="text"
          placeholder="Nome do Artista ou Album"
          value={ search }
          onChange={ this.onInputChange }
        />
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ buttonDisable }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
