import React from "react";
import Login from "./containers/login";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Signup from "./containers/signup"
import Home from './containers/home'
import Heart from './containers/heart'
import History from './history'
import Navbar from './components/navbar'
import ParticleBackground from "./components/particleBackground";

export const authetication={
  isLoggedIn:false,
  onAuthentication(){
    this.isLoggedIn=true
  },
  getLoginStatus(){
    return this.isLoggedIn;
  }
}

function SecuredRoute(props){
  return (
    <Route path={props.path} render={data => authetication.getLoginStatus() ? 
    (<props.component {...data}></props.component>):(<Redirect to={{pathname:'/'}}></Redirect>)}></Route>
  )
}
function App() {
  return (
    <div>
    <ParticleBackground />
    <div className="App">
      <Router history={History}>
        <Switch>
          <Route exact path="/" component={Home} />
           <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Signup} />
          <Route exact path="/Sales" component={Heart} />
        </Switch>
      </Router>
    </div>
    </div>
  );
}

export default App;
