import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from './components/Menu';
import AppNavbar from './components/AppNavbar';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faUser, faSignOutAlt, faMusic, faStar, faHistory } from '@fortawesome/free-solid-svg-icons'



import { Container } from 'reactstrap';


library.add(faHome, faUser, faSignOutAlt, faMusic, faStar, faHistory)

function App() {
  return (
    <div className="App">
    
      <div className="wrapper">
        <Menu />
        <Container id="main">
          <AppNavbar />
        </Container>
      </div>
    </div>
  );
}

export default App;
