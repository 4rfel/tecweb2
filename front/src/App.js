import React, { useState, useEffect } from "react";
import api from "./services/api";
import api2 from "./services/api2";
import lol from "riot-lol";



function App() {
  const tags = [
    {"tag": "Escolha um tipo"},
    {"tag": "Fighter"},
    {"tag": "Tank"},
    {"tag": "Mage"},
    {"tag": "Assassin"},
    {"tag": "Marksman"}]
  // const tags = ["Fighter", "Tank", "Mage", "Assassin", "Support", "Marksman"];

  const [tag1, settag1] = useState(null);
  const [tag2, settag2] = useState(null);
  const [champs, setChamps] = useState([
    {nome: "Aatrox", tag1: "Fighter", tag2: "Tank", dif: 4},
    {nome: "Ahri", tag1: "Mage", tag2: "Assassin", dif: 5},
    {nome: "Akali", tag1: "Assassin", tag2: undefined, dif: 7},
    {nome: "Alistar", tag1: "Tank", tag2: "Support", dif: 7}]);
  // const [champs1, setChamps1] = useState(null);
  // const [champs2, setChamps2] = useState(null);
  const [champ1, setChamp1] = useState(null);
  const [champ2, setChamp2] = useState(null);
  const [champ3, setChamp3] = useState(null);
  const [go, setGo] = useState(false);


  useEffect(() => {
    const getChamps = async () => {
      await api
        .get(`champs`, {
          params: {
            "tag1":tag1,
            "tag2":tag2,
            "champs": champs
          }
        })
        .then(({ data }) => {
          setChamp1(data.champIzi);
          setChamp2(data.champMed);
          setChamp3(data.champHard);
          // console.log(data);
        })
        .catch(e => {
          return e;
        });
    };
    if(tag1!==null && tag2!==null && go===true){
      getChamps();
      setGo(false)
    }
  });
          console.log(info)
        })
        .catch(e => {
          return e;
        });
    };
    getChamps()

    
  }, []);

  //const getListDif = (dif) =>{
    //for (var champion in )
  //};
  
    
  const onTag1Select = e => {
    settag1(e.target.value);
  };
  const onTag2Select = e => {
    settag2(e.target.value);
  };
  const onClickGo = e => {
    setGo(true)
  };

  return(
<div>
  <h1>Selecione 2 categorias para escolher o campião perfeito!</h1>
  <select onChange={onTag1Select}>
      {tags.map((obj, index) => {
        return (
          <option key={`${index}-${obj.tag}`} value={obj.tag}>
            {obj.tag}{" "}
          </option>
        );
      })}
  </select>
  <select onChange={onTag2Select}>
    {tags.map((obj, index) => {
      return (
        <option key={`${index}-${obj.tag}`} value={obj.tag}>
          {obj.tag}{" "}
        </option>
      );
    })}
  </select>
  <button onClick={onClickGo}>Click</button>
  {tag1!==null &&
    <div>
      Primeira categoria: {tag1}
    </div>
  }
  {tag2!==null &&
    <div>
      Segunda categoria: {tag2}
    </div>
  }
  {champ1!==null &&
  <div>
    Campeão de dificuldade mínima: {champ1}
  </div>}
  {champ2!==null &&
  <div>
    Campeão de dificuldade média: {champ2}
  </div>}
  {champ3!==null &&
  <div>
    Campeão de dificuldade máxima: {champ3}
  </div>
  }
</div>
  )
  }

export default App;