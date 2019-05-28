import React from "react";
import { Button } from "antd";
import IconText from "./IconText";

const IconButton = ({ type, text, color, onClick }) => (
  <Button type="link" onClick={onClick} block>
    <IconText type={type} text={text} color={color} />
  </Button>
);

export default IconButton;
