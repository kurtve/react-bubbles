import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from 'styled-components';

import { BubbleContext } from './contexts/BubbleContext';
import { getToken } from './utils/api';

import Login from "./components/Login";
import "./styles.scss";


const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  font-family: "Montserrat", sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 4rem;
    margin: 20px;
  } 

  svg {
      height: 100%;
  }

`;



const App = () => {

  const initialState = {
    colors: [],
    token: getToken()
  }

  const [bubbleState, setState] = useState(initialState);

  console.log(bubbleState);


  return (
    <Router>
      <BubbleContext.Provider value={ {bubbleState, setState} } >
        <AppWrapper>
          <h1>Welcome to the Bubble App!</h1>
          <Route exact path="/" component={Login} />

        </AppWrapper>
      </BubbleContext.Provider>
    </Router>
  );
}

export default App;
