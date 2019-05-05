import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignIn from "./components/SignIn";
import LogIn from "./components/LogIn";
import { history } from "./_helpers/history";
import { authenticationService } from "./_services/authentication_service";
// import { PrivateRoute } from '@/_components/PrivateRoute';

import './App.css';

function Index() {
  return <h2>Index</h2>;
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x =>
      this.setState({ currentUser: x })
    );
  }

  logout() {
    authenticationService.logout();
    history.push("/login");
  }

  render() {
    const { alert } = this.props;
    console.log(alert);

    return (
      <Router>
        <Link to="/">Home</Link>
        <Link to="/signin">Sign in</Link>
        <Link to="/login">Log in</Link>
        
        <Route path="/" exact component={Index} />
        <Route path="/signin" component={SignIn} />
        <Route path="/login" component={LogIn} />
      </Router>
    );
  }
}
export default App;
