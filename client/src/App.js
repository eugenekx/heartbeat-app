import React, { Component } from 'react';
import './App.css';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Menu from './components/Menu';
import AppNavbar from './components/AppNavbar';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPen, faPlus, faHeadphones, faFileImage, faFileAudio, faHome, faUser, faSignOutAlt, faMusic, faStar, faHistory, faHeartbeat, faBell, faPlay, faForward, faThumbsUp, faThumbsDown, faBackward, faVolumeUp, faPause, faCamera} from '@fortawesome/free-solid-svg-icons'
import { faBandcamp, faSpotify, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'

import { Container, Row, Col } from 'reactstrap';
import FooterPlayer from './components/FooterPlayer';

import Review from './components/Review';
import Register from './components/Register';
import Login from './components/Login';
import YourMusic from './components/YourMusic';
import Favorite from './components/Favorite';
import History from './components/History';
import SongInfo from './components/SongInfo';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

library.add(faPen, faPlus, faHeadphones, faFileImage, faFileAudio, faHome, faUser, faSignOutAlt, faMusic, faStar, faHistory, faHeartbeat, faBell, faPlay, faForward, faBandcamp, faSpotify, faFacebook, faTwitter, 
            faThumbsUp, faThumbsDown, faBackward, faVolumeUp, faPause, faCamera);

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  
  render() {
    console.log(store.getState());
    return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <PrivateRoute path="/review" component={Review} />
            <PrivateRoute path="/your_music" exact component={YourMusic} />
            <PrivateRoute path="/your_music/song" component={SongInfo} />
            <PrivateRoute path="/favorite" exact component={Favorite} />
            <PrivateRoute path="/history" exact component={History} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Redirect from="/" to="/review" />
          </Switch> 
        </div>
      </Router>
    </Provider>
  );
}
}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    store.getState().auth.isAuthenticated === true
      ? 
      <div>
        <div className="wrapper">
          <Menu />

          <Container id="main">
            <AppNavbar />
            <Component {...props}/>
          </Container>
          
          <FooterPlayer />
        </div>
      </div>
      : <Redirect to='/login' />
  )} />
);


export default App;
