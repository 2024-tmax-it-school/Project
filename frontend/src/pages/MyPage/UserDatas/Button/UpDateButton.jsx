import React from "react";
import "./ButtonStyle.css";

const UpDateButton = ({ text, userUpdate }) => {
  return <button onClick={userUpdate}>{text}</button>;
};

export default UpDateButton;
