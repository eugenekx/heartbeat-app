import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from './components/Menu';
import AppNavbar from './components/AppNavbar';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faUser, faSignOutAlt, faMusic, faStar, faHistory, faHeartbeat, faBell} from '@fortawesome/free-solid-svg-icons'


import { Container, Row, Col } from 'reactstrap';
import FooterPlayer from './components/FooterPlayer';
import GenresList from './components/GenresList';
import SongPlayer from './components/SongPlayer';

library.add(faHome, faUser, faSignOutAlt, faMusic, faStar, faHistory, faHeartbeat, faBell)

function App() {
  return (
    <div className="App">
    
      <div className="wrapper">
        <Menu />

        <Container id="main">
          <AppNavbar />
          <Container className="ml-3">
            <Row>
              <Col>
                <SongPlayer />
              </Col>

              <Col xs="auto" className="d-none d-lg-inline">
                <GenresList />
              </Col>
            </Row>
          </Container>
        </Container>
        
        <FooterPlayer />
      </div>
    </div>
  );
}

export default App;
