import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Main from "./Main";
import Footer from "./Footer";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar className="main-component" />
      <Header className="main-component" />
      <Main className="main-component" />
      <Footer className="main-component" />
    </div>
  );
}

export default App;
