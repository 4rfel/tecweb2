import React, { useState, useEffect } from "react";
// import api from "./services/api";
import lol from "riot-lol";



function App() {
  const types = [
    {"type": "Fighter"},
    {"type": "Tank"},
    {"type": "Mage"},
    {"type": "Assassin"},
    {"type": "Marksman"}]
  // const types = ["Fighter", "Tank", "Mage", "Assassin", "Support", "Marksman"];

  const [type1, setType1] = useState("Escolha uma categoria");
  const [type2, setType2] = useState("Escolha uma categoria");


  lol.getChampions().then(champions => {
    console.log(champions);
  });
    
  const onType1Select = e => {
    setType1(e.target.value);
  };
  const onType2Select = e => {
    setType2(e.target.value);
  };
  return(
<div>
  <h1>oi mayra</h1>
  <select value={type1} onChange={onType1Select}>
      {types.map((obj, index) => {
        return (
          <option key={`${index}-${obj.type}`} value={obj.type}>
            {obj.type}{" "}
          </option>
        );
      })}
  </select>
  <select value={type2} onChange={onType2Select}>
    {types.map((obj, index) => {
      return (
        <option key={`${index}-${obj.type}`} value={obj.type}>
          {obj.type}{" "}
        </option>
      );
    })}
  </select>
</div>
  )
}
export default App;