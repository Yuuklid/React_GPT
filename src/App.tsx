import React from "react";
import ChatInterface from "./components/chatgpt";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import SpinnerTest from "./components/spinner";

const App: React.FC = () => {
  return (
    <>
      <div className="container">
        <ChatInterface className="chat-component" />
      </div>
    </>
  );
};

export default App;
