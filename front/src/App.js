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

  const [type1, setType1] = useState("Ainda não selecionado");
  const [type2, setType2] = useState("Ainda não selecionado");
  const [champ1, setChamp1] = useState("...");
  const [champ2, setChamp2] = useState("...");
  const [champ3, setChamp3] = useState("...");

  champs = []

  champsFaceis = []

  champsMedios: []

  champsDificeis: []

  lol.getChampions().then(champions => {
    this.setState({ champs: champions});
  });
    
  const onType1Select = e => {
    setType1(e.target.value);
  };
  const onType2Select = e => {
    setType2(e.target.value);
  };
  return(
<div>
  <h1>Selecione 2 categorias para escolher o campião perfeito!</h1>
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
  <div>
    Primeira categoria:{type1}
  </div>
  <div>
    Segunda categoria:{type2}
  </div>
  <div>
    Campeão de dificuldade mínima: {champ1}
  </div>
  <div>
    Campeão de dificuldade média: {champ2}
  </div>
  <div>
    Campeão de dificuldade máxima: {champ3}
  </div>
</div>
  )
  }

export default App;