import React, { Component } from 'react';
import './App.css';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Menu from './components/Menu';
import AppNavbar from './components/AppNavbar';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faUser, faSignOutAlt, faMusic, faStar, faHistory, faHeartbeat, faBell, faPlay, faForward, faThumbsUp, faThumbsDown, faBackward, faVolumeUp, faPause} from '@fortawesome/free-solid-svg-icons'
import { faBandcamp, faSpotify, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'

import { Container, Row, Col } from 'reactstrap';
import FooterPlayer from './components/FooterPlayer';
import GenresList from './components/GenresList';
import SongPlayer from './components/SongPlayer';
import ArtistInfo from './components/ArtistInfo';
import YourRating from './components/YourRating';
import Register from './components/Register';
import Login from './components/Login';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

library.add(faHome, faUser, faSignOutAlt, faMusic, faStar, faHistory, faHeartbeat, faBell, faPlay, faForward, faBandcamp, faSpotify, faFacebook, faTwitter, 
            faThumbsUp, faThumbsDown, faBackward, faVolumeUp, faPause);

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <PrivateRoute path="/review" component={Review} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Redirect from="/" to="/review" />
          </Switch> 
        </div>
      </Router>
    </Provider>
  );
}
}
const Review = () => (
  <div className="wrapper">
  <Menu />

  <Container id="main">
    <AppNavbar />
    <Container className="ml-3">
      <Row>
        <Col>
          <SongPlayer />
          <Row>
            <Col xs="auto">
              <ArtistInfo />
            
            </Col>
              <YourRating />    
          </Row>
        </Col>

        <Col xs="auto" className="d-none d-lg-inline">
          <GenresList />
        </Col>
      </Row>
    </Container>
  </Container>
  
  <FooterPlayer />
</div>
);


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    store.getState().auth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

export default App;
