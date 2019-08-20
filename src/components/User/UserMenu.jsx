import React, { useEffect, useState } from "react";
import { Menu, Avatar } from "antd";
import { Link } from "react-router-dom";
import { userService } from "../../_services/user_service";

const { SubMenu } = Menu;

// Menu component displaying logout link and edit for user info
function UserMenu(props) {
  const [nick, setNick] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    userService.getInfo().then(response => {
      const user = response.data;
      setNick(user.nickname);
      setAvatar(user.image.url);
    });
  }, []);
  return (
    <SubMenu
      title={
        <span>
          <Avatar src={avatar} />
          <span>{nick}</span>
        </span>
      }
      style={props.style}
      {...props}
    >
      <Menu.Item key="/users/edit">
        <Link to="/users/edit">Edit profile</Link>
      </Menu.Item>
      <Menu.Item key="/logout">
        <Link to="/logout">Log out</Link>
      </Menu.Item>
    </SubMenu>
  );
}

export default UserMenu;
