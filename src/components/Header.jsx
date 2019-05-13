import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import { Layout, Menu } from "antd";
import { AuthContext } from "../_helpers/auth_context";
const { Header } = Layout;

function CustomHeader(props) {
  const context = useContext(AuthContext);
  const style = { float: "right" };
  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: "64px" }}
        defaultSelectedKeys={["/"]}
      >
        <Menu.Item key="/">
          <Link to="/">
            <img src={Logo} style={{ height: "54px" }} alt="Home" />
          </Link>
        </Menu.Item>

        {context.isAuth ? (
          [<Menu.Item key="/posts/new">
            <Link to="/posts/new">Create new post</Link>
          </Menu.Item>,
          <Menu.Item key="/logout" style={style}>
            <Link to="/logout">Log out</Link>
          </Menu.Item>]
        ) : (
          [
            <Menu.Item key="/signin" style={style}>
              <Link to="/signin">Sign in</Link>
            </Menu.Item>,
            <Menu.Item key="/login" style={style}>
              <Link to="/login">Log in</Link>
            </Menu.Item>
          ]
        )}
      </Menu>
    </Header>
  );
}

export default CustomHeader;
