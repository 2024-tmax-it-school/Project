import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logo from "assets/applyPythonLogo.png";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate("/ranking");
  };

  const handleClickProfile = () => {
    navigate("/mypage");
  };

  return (
    <div className="Header">
      <button className="logo_container" onClick={handleClickLogo}>
        <span>애선씨네 사랑방</span>
        <img src={Logo} alt="logo" className="logo" />
      </button>
      <button onClick={handleClickProfile}>
        <AccountCircleIcon sx={{ fontSize: "32px" }} />
      </button>
    </div>
  );
}

export default Header;
