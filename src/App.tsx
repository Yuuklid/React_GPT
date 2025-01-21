import React from "react";
import ChatInterface from "./components/chatgpt";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { motion } from "motion/react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Page components
const Home: React.FC = () => {
  return (
    <div className="page">
      <h1>Home Page</h1>
    </div>
  );
}

const Chat: React.FC = () => {
  return ( 
  <div className='chat-component'>
    <ChatInterface>
    </ChatInterface>
  </div>
  )
}


const App: React.FC = () => {
  return (
    <>
    <ThemeProvider>
      <ModeToggle></ModeToggle>
      <Router>
        <nav className="navigation">
          <ul className="nav-list">
            <li>
              <Link to="/" className="nav-link">
                Home 
              </Link>
            </li>
            <li> 
              <Link to="/chat" className="nav-link">
                Chat
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
