import { Input } from "antd";
import React from "react";
import "./styles.scss";

function TextInput({
  placeHolder,
  prefix,
  suffix,
  id,
  required,
  onChange,
  value,
  style,
}) {
  return (
    <Input
      className="text-input"
      placeholder={placeHolder}
      prefix={prefix}
      value={value}
      onChange={onChange}
      suffix={suffix}
      style={style}
    />
  );
}

export default TextInput;
