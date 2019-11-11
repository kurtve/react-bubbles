import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { BubbleContext } from './contexts/BubbleContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import BubblePage from './components/BubblePage';

import './styles.scss';


const App = () => {

  const initialState = {
    colors: []
  };

  const [bubbleState, setState] = useState(initialState);

  return (
    <Router>
      <BubbleContext.Provider value={ {bubbleState, setState} } >
        <div className='App'>

          <Route exact path="/" component={Login} />

          <ProtectedRoute path='/bubbles' component={BubblePage} />

        </div>
      </BubbleContext.Provider>
    </Router>
  );
}

export default App;
