import "./Header.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "utils/axiosInstance";

import { Box, Button } from "@mui/material";
import Popover from "@mui/material/Popover";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logo from "assets/applyPythonLogo.png";

function Header() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const user_id = sessionStorage.getItem("user_id");

  const handleClickLogo = () => {
    navigate("/ranking");
  };

  const logOut = async () => {
    axiosInstance("/logout");
    sessionStorage.removeItem("user_id");
    navigate("/signin");
  };

  const navigateToPage = (path) => {
    navigate(`/${path}`);
  };

  const handleClickProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderButton = () => {
    return isLoggedIn ? (
      <>
        <Button variant="outlined" onClick={() => navigateToPage("mypage")}>
          마이페이지
        </Button>
        <Button variant="outlined" onClick={logOut}>
          로그아웃
        </Button>
      </>
    ) : (
      <>
        <Button variant="outlined" onClick={() => navigateToPage("signin")}>
          로그인
        </Button>
        <Button variant="outlined" onClick={() => navigateToPage("signup")}>
          회원가입
        </Button>
      </>
    );
  };

  useEffect(() => {
    if (user_id) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user_id]);

  return (
    <div className="Header">
      <button className="logo_container" onClick={handleClickLogo}>
        <span className="logo_title">애선씨네 사랑방</span>
        <img src={Logo} alt="logo" className="logo" />
      </button>
      <button onClick={handleClickProfile}>
        <AccountCircleIcon sx={{ fontSize: "32px" }} />
      </button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          marginTop: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
            gap: 1,
            width: 180,
            // height: 150,
          }}
        >
          {renderButton()}
        </Box>
      </Popover>
    </div>
  );
}

export default Header;
