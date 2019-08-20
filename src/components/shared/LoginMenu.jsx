import React from "react";
import {Icon, Menu} from "antd";
import {Link} from "react-router-dom";

const {SubMenu} = Menu;

// Menu component with authentication action for not logged in user
function LoginMenu(props) {

  return (
    <SubMenu
      title={
        <span>
          <Icon type="user"/>
        </span>
      }
      style={props.style}
      {...props}
    >
      <Menu.Item key="/login">
        <Link to="/login">Log in</Link>
      </Menu.Item>
      <Menu.Item key="/signin">
        <Link to="/signin">Sign in</Link>
      </Menu.Item>
    </SubMenu>
  );
}

export default LoginMenu;
