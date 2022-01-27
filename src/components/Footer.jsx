import { BottomNavigation } from "@mui/material";
import React from "react";
import "./App.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <BottomNavigation className="footer">
      <h5>Jeffery Adorkor @ {year}</h5>
    </BottomNavigation>
  );
}

export default Footer;
