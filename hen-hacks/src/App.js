import './App.css';
import React, {useState} from "react";

function clickMe(){
  alert("You clicked me.");
}

function App() {
  return (
    <div>
      <button onClick={clickMe}>
      Button
      </button>
    </div>
  );
}

export default App;
