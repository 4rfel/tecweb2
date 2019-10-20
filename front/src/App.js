import React, { useState, useEffect } from "react";
import api from "./services/api";
import api2 from "./services/api2";
import "./App.css";
import lol from "riot-lol";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';





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

  useEffect(() => {
    const getChamps1 = async () => {
      await api2
        .get()
        .then(({ data }) => {
          const aa = data.data
          var info = []
          for(var champ in aa){
            var dict = {
              "nome": aa[champ].id,
              "tag1": aa[champ].tags[0],
              "tag2": aa[champ].tags[1],
              "dif": aa[champ].info.difficulty
            };
            // console.log(dict);
            info.push(dict);
          }
          setChamps(info)
          console.log(info)
        })
        .catch(e => {
          return e;
        });
    };
    getChamps1()
    
  }, []);
  
    
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
<link href='https://fonts.googleapis.com/css?family=Eczar' rel='stylesheet'/>
<link href='https://fonts.googleapis.com/css?family=Bowlby One SC' rel='stylesheet'/>
  <p style={{ fontFamily: 'Bowlby One SC', fontSize: 34, color: "#DAA520", textShadow:"-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000, 1px 1px 0 #000"}}>Saudações invocador! </p>
  <p style={{ fontSize: 18, fontFamily: "Eczar", color:"#ffffff" }}>Deseja aumentar sua champion pool, ou escolher seu champ com base em categorias e dificuldade? Então selecione 2 categorias para escolher o campião perfeito!</p>
  <Container style={{ fontSize: 14, fontFamily: "Eczar", color:"#ffffff" }}>
    <Row>
      Primeira categoria: 
    <select style={{ fontSize: 12, fontFamily: "Eczar", color:"#ffffff", backgroundColor: "#335264" }} onChange={onTag1Select}>
      {tags.map((obj, index) => {
        return (
          <option key={`${index}-${obj.tag}`} value={obj.tag}>
            {obj.tag}{" "}
          </option>
        );
      })}
    </select>
    </Row>
    <Row style={{ marginTop:"1%"}}>
      Segunda categoria:
    <select style={{ fontSize: 12, fontFamily: "Eczar", color:"#ffffff", backgroundColor: "#335264" }} onChange={onTag2Select}>
    {tags.map((obj, index) => {
      return (
        <option key={`${index}-${obj.tag}`} value={obj.tag}>
          {obj.tag}{" "}
        </option>
      );
    })}
    </select>
    <button style={{ fontSize: 12, fontFamily: "Eczar", color:"#ffffff", backgroundColor: "#34576A", marginLeft:"1%" }} onClick={onClickGo}>Procurar</button>
    </Row>
  </Container>
  
  
 
  <Container>
    <Row>
    {tag1!==null && tag2!==null &&
    <div style={{ fontSize: 18, fontFamily: "Eczar", color:"#DAA520", marginTop:"1%", textShadow:"-0.5px -0.5px 0 #000,0.5px -0.5px 0 #000,-0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000" }}>
      As categorias selecionadas foram: {tag1}, {tag2}
    </div>
    
    }
    </Row>
    <Row >
    {champ1!==null &&
    <div style={{ fontSize: 18, fontFamily: "Eczar", color:"#ffffff" }}> 
      Campeão de dificuldade mínima: {champ1}
    </div>}
    </Row>
    <Row>
    {champ2!==null &&
    <div style={{ fontSize: 18, fontFamily: "Eczar", color:"#ffffff" }}>
      Campeão de dificuldade média: {champ2}
    </div>}
    </Row>
    <Row>
    {champ3!==null &&
    <div style={{ fontSize: 18, fontFamily: "Eczar", color:"#ffffff" }}>
      Campeão de dificuldade máxima: {champ3}
    </div>
    }
    </Row>
  </Container>
  
</div>
  )
  }

export default App;