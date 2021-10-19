import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import NotFound from './components/NotFound';
import Header from './components/Header';

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
            <Route path="/search" component={ Header } />
            <Route path="/search" component={ Search } />
            <Route path="/Album" component={ Header } />
            <Route path="/album/:id" render={ () => (<Album />) } />
            <Route path="/favorites" component={ Header } />
            <Route path="/favorites" component={ Favorites } />
            <Route path="/profile" component={ Header } />
            <Route exact path="/profile" component={ Profile } />
            <Route path="/profile/edit" component={ Header } />
            <Route path="/profile/edit" component={ ProfileEdit } />
            <Route path="*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
