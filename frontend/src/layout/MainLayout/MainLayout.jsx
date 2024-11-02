import React from "react";

import "./MainLayout.css";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

function MainLayout() {
  return (
    <div className="MainLayout">
      <Header />
      <Outlet />
    </div>
  );
}

export default MainLayout;
