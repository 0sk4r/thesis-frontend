import React, {useContext} from "react";
import {Link} from "react-router-dom";
import Logo from "../../../images/logo.png";
import {Layout, Menu} from "antd";
import {AuthContext} from "../../../_helpers/auth_context";
import NotificationComponent from "../../Notifications/NotificationComponent"
import UserMenu from "../../User/UserMenu"
import LoginMenu from "./LoginMenu";
import CategoryMenu from "../../Category/CategoryMenu";

const {Header} = Layout;

// Component that is displaying in header
function CustomHeader() {
  const context = useContext(AuthContext);
  const style = {float: "right"};
  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{lineHeight: "64px"}}
        defaultSelectedKeys={["/"]}
      >
        {/* Site logo is link to root */}
        <Menu.Item key="/">
          <Link to="/">
            <img src={Logo} style={{height: "54px"}} alt="Home"/>
          </Link>
        </Menu.Item>
        <CategoryMenu/>

        {/* render menus depending on authentication status */}
        {context.isAuth ? (
          [<Menu.Item key="/posts/new">
            <Link to="/posts/new">Create new post</Link>
          </Menu.Item>,
            <Menu.Item key="/notifications/" style={style}>
              <NotificationComponent/>
            </Menu.Item>,
            <UserMenu style={style}/>]
        ) : (
          [
            <LoginMenu style={style}/>
          ]
        )}
      </Menu>
    </Header>
  );
}

export default CustomHeader;
