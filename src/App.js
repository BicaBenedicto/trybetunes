import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import NotFound from './components/NotFound';

class App extends React.Component {
  render() {
    return (
      <>
        <header>
          <h1>
            TrybeTunes
          </h1>
        </header>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/search" component={ Search } />
            <Route path="/album/:id" render={ () => (<Album />) } />
            <Route path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
