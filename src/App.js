import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import LogIn from "./components/LogIn";
import LogOut from "./components/LogOut";
import Header from "./components/Header";
import PostForm from "./components/Post/PostForm"
import "./App.css";
import { Layout } from "antd";
import { AuthProvider } from "./_helpers/auth_context";
const { Content, Footer } = Layout;

function Index() {
  return <h2>Index</h2>;
}

class App extends React.Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          <Layout className="layout" style={{ minHeight: "100vh" }}>
            <Header />

            <Content style={{ padding: "50px 50px" }}>
              <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
                <Route path="/" exact component={Index} />
                <Route path="/signin" component={SignIn} />
                <Route path="/login" component={LogIn} />
                <Route path="/logout" component={LogOut} />
                <Route path="/post/new" component={PostForm} />
              </div>
            </Content>

            <Footer style={{ textAlign: "center" }}>
              Blogger Created by Oskar Sobczyk
            </Footer>
            
          </Layout>
        </AuthProvider>
      </Router>
    );
  }
}
export default App;
