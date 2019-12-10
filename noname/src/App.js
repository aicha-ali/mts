import React, { Component } from "react";
import Character from './Components/Character'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Allcharacter from "./Views/Allcharacters";
import Admininterface from "./Views/admin_interface";
import Login from "./Views/login";
import Register from "./Views/register";



class App extends Component {
  render() {
    return (
      
          <Router>
          <Switch>
            <Route exact path="/" component={Allcharacter}/>
            <Route exact path="/character" component={Character}/>
            <Route exact path="/admininterface" component={Admininterface}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>


            
          </Switch>
        </Router>
      
    )

  }
}

export default App;
