import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Search from './components/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './components/NotFound';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="*">
          <header className="d-flex align-items-center justify-content-around bg-info p-4 rounded-pill m-5">
          <h1 className="glyphicon glyphicon-headphones"> </h1>
            <h1 className="m-3">
              TrybeTunes
            </h1>
          </header>
        </Route>
        <Route path="/search" component={ Header } />
        <Route path="/Album" component={ Header } />
        <Route path="/favorites" component={ Header } />
        <Route path="/profile/edit" component={ Header } />
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ (props) => (<Album { ...props } />) } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
