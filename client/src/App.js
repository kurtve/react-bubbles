import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import BubblePage from './components/BubblePage';

import './styles.scss';


const App = () => {

  return (
    <Router>
      <div className='App'>
        <Route exact path="/" component={Login} />
        <ProtectedRoute path='/bubbles' component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
