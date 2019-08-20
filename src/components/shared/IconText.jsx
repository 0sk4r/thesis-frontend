import React from "react";
import {Icon} from "antd";

// Button with text
const IconText = ({type, text, color}) => (
  <span>
    <Icon
      type={type}
      style={{marginRight: 8}}
      theme="twoTone"
      twoToneColor={color}
    />
    {text}
  </span>
);

export default IconText;
