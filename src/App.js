import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from "./components/shared/PrivateRoute";
import SignIn from "./components/Authentication/SignIn";
import LogIn from "./components/Authentication/LogIn";
import LogOut from "./components/Authentication/LogOut";
import Header from "./components/shared/Layout/Header";
import PostForm from "./components/Post/PostForm";
import PostListComponent from "./components/Post/PostListComponent";
import PostShow from "./components/Post/PostShow";
import PostEditForm from "./components/Post/PostEditForm";
import UserEditForm from "./components/User/UserEditForm";
import "./App.css";
import {Layout} from "antd";
import {AuthProvider} from "./_helpers/auth_context";
import CategoryShow from "components/Category/CategoryShow";

const {Content, Footer} = Layout;

class App extends React.Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          <Layout className="layout" style={{minHeight: "100vh"}}>
            <Header/>

            <Content style={{padding: "50px 50px"}}>
              <div style={{background: "#fff", padding: 24, minHeight: 280}}>
                <Route path="/" exact component={PostListComponent}/>
                <Route path="/signin" component={SignIn}/>
                <Route path="/login" component={LogIn}/>
                <PrivateRoute path="/logout" component={LogOut}/>
                <Switch>
                  <PrivateRoute path="/posts/new" component={PostForm}/>
                  <PrivateRoute
                    path="/posts/:id/edit"
                    component={PostEditForm}
                  />
                  <Route path="/posts/:id" component={PostShow}/>
                </Switch>
                <PrivateRoute path="/users/edit" component={UserEditForm}/>
                <Route path="/categories/:id" component={CategoryShow}/>
              </div>
            </Content>

            <Footer style={{textAlign: "center"}}>
              Blogger Created by Oskar Sobczyk
            </Footer>
          </Layout>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;
