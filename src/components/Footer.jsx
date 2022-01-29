import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <h5>Jeffery Adorkor @ {year}</h5>
    </footer>
  );
}

export default Footer;
