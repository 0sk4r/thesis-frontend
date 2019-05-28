import React from "react";
import { Icon } from "antd";

const IconText = ({ type, text, color }) => (
  <span>
    <Icon
      type={type}
      style={{ marginRight: 8 }}
      theme="twoTone"
      twoToneColor={color}
    />
    {text}
  </span>
);

export default IconText;
