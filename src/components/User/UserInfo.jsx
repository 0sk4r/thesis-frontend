import React, { useContext } from "react";
import { Descriptions, Avatar } from "antd";
import FollowButton from "components/shared/Buttons/FollowButton";
import { AuthContext } from "_helpers/auth_context";

// Display info about user
function UserInfo({ user }) {
  const context = useContext(AuthContext);

  return (
    <Descriptions title="User Info">
      <Descriptions.Item label="Nickname: ">{user.nickname}</Descriptions.Item>
      <Descriptions.Item label="Name: ">{user.name}</Descriptions.Item>
      <Descriptions.Item label="Avatar: ">
        <Avatar src={user.image.url} />
      </Descriptions.Item>
      {context.isAuth ? (
        <Descriptions.Item>
          <FollowButton id={user.id} />
        </Descriptions.Item>
      ) : null}
    </Descriptions>
  );
}

export default UserInfo;
