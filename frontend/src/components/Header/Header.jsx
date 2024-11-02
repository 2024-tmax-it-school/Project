import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logo from "assets/applyPythonLogo.png";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleClickProfile = () => {
    navigate("/mypage");
  };

  return (
    <div className="Header">
      <div className="logo_container">
        <span>애선씨네 사랑방</span>
        <img src={Logo} alt="logo" className="logo" />
      </div>
      <div onClick={handleClickProfile}>
        <AccountCircleIcon sx={{ fontSize: "32px" }} />
      </div>
    </div>
  );
}

export default Header;
