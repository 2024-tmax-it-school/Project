import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import "./Header.css";

function Header() {
  return (
    <div className="Header">
      <div className="logo">
        <span>애선씨네 사랑방</span>
        <img src="" />
      </div>
      <div>
        <AccountCircleIcon sx={{ fontSize: "32px" }} />
      </div>
    </div>
  );
}

export default Header;
