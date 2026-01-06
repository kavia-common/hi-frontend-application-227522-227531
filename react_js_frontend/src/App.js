import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import "./App.css";

// PUBLIC_INTERFACE
function App() {
  return (
    <BrowserRouter>
      <div className="appShell">
        <header className="topNav">
          <div className="container">
            <div className="topNavInner">
              <Link to="/" className="brand" aria-label="Hi Home">
                <span className="brandMark" aria-hidden="true" />
                <span>Hi</span>
              </Link>

              <nav className="navLinks" aria-label="Primary">
                <a className="navLink" href="#features">
                  Features
                </a>
                <a className="navLink" href="#environment">
                  Environment
                </a>
              </nav>
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        <footer className="footer">
          <div className="container">
            <div className="footerInner">
              <div>
                <strong>Hi</strong> — Ocean Professional React starter
              </div>
              <div className="smallNote">Built for quick preview and future expansion.</div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
