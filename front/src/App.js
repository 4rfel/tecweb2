import React, { useState, useEffect } from "react";
import api from "./services/api";
import lol from "riot-lol";



function App() {
  const types = [
    {"type": "Escolha um tipo"},
    {"type": "Fighter"},
    {"type": "Tank"},
    {"type": "Mage"},
    {"type": "Assassin"},
    {"type": "Marksman"}]
  // const types = ["Fighter", "Tank", "Mage", "Assassin", "Support", "Marksman"];

  const [type1, setType1] = useState(null);
  const [type2, setType2] = useState(null);
  const [champs, setChamps] = useState(null);
  const [champ1, setChamp1] = useState(null);
  const [champ2, setChamp2] = useState(null);
  const [champ3, setChamp3] = useState(null);
  const [go, setGo] = useState(false);


  useEffect(() => {
    const getChamps = async () => {
      await api
        .get(`champs`, {
          params: {
            "type1":type1,
            "type2":type2,
            "champs": champs
          }
        })
        .then(({ data }) => {
          setChamp1(data.champIzi);
          setChamp2(data.champMed);
          setChamp3(data.champHard);
          console.log(data);
        })
        .catch(e => {
          return e;
        });
    };
    if(type1!==null && type2!==null && go===true){
      getChamps();
      setGo(false)
    }
  });

  useEffect(() => {
    lol.getChampions().then(champions => {
      setChamps(champions)
    });
  }, []);
  
    
  const onType1Select = e => {
    setType1(e.target.value);
  };
  const onType2Select = e => {
    setType2(e.target.value);
  };
  const onClickGo = e => {
    setGo(true)
  };

  return(
<div>
  <h1>Selecione 2 categorias para escolher o campião perfeito!</h1>
  <select onChange={onType1Select}>
      {types.map((obj, index) => {
        return (
          <option key={`${index}-${obj.type}`} value={obj.type}>
            {obj.type}{" "}
          </option>
        );
      })}
  </select>
  <select onChange={onType2Select}>
    {types.map((obj, index) => {
      return (
        <option key={`${index}-${obj.type}`} value={obj.type}>
          {obj.type}{" "}
        </option>
      );
    })}
  </select>
  <button onClick={onClickGo}>Click</button>
  {type1!==null &&
    <div>
      Primeira categoria: {type1}
    </div>
  }
  {type2!==null &&
    <div>
      Segunda categoria: {type2}
    </div>
  }
  {champ1!==null &&
  <div>
    Campeão de dificuldade mínima: {champ1}
  </div> &&
  <div>
    Campeão de dificuldade média: {champ2}
  </div> &&
  <div>
    Campeão de dificuldade máxima: {champ3}
  </div>
  }
</div>
  )
  }

export default App;