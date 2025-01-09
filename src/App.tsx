import React from "react";
import GPT from "./components/chatgpt";
import Timer from "./components/timer";

const App: React.FC = () => {
  return (
    <>
    <div>
      <h1 style={{ textAlign: "center" }}>ChatGPT Interface</h1>
      <GPT />
    </div>
    <div>
      <Timer />
    </div>
    </>
  );
};

export default App;
