import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignIn from "./components/SignIn";
import LogIn from "./components/LogIn";
import "./App.css";
import Logo from "./images/logo.png";
import { Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

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

  componentDidMount() {}

  render() {
    return (
      <Router>
        <Layout className="layout" style={{ minHeight: "100vh" }}>
          <Header>
            <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
              <Menu.Item key="1">
                <Link to="/">
                  <img src={Logo} style={{ height: "54px" }} alt="Home" />
                </Link>
              </Menu.Item>

              <Menu.Item key="2">
                <Link to="/signin">Sign in</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/login">Log in</Link>
              </Menu.Item>
            </Menu>
          </Header>

          <Content style={{ padding: "50px 50px" }}>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              <Route path="/" exact component={Index} />
              <Route path="/signin" component={SignIn} />
              <Route path="/login" component={LogIn} />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Blogger Created by Oskar Sobczyk
          </Footer>
        </Layout>
      </Router>
    );
  }
}
export default App;
