import React, { useState, useEffect } from "react";
import api from "./services/api";
import api2 from "./services/api2";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';

function App() {
  const tags = [
    {"tag": "Escolha um tipo"},
    {"tag": "Fighter"},
    {"tag": "Tank"},
    {"tag": "Mage"},
    {"tag": "Assassin"},
    {"tag": "Marksman"}]
  // const tags = ["Fighter", "Tank", "Mage", "Assassin", "Support", "Marksman"];

  const [tag1, settag1] = useState(undefined);
  const [tag2, settag2] = useState(undefined);
  const [champs, setChamps] = useState([
    {nome: "Aatrox", tag1: "Fighter", tag2: "Tank", dif: 4},
    {nome: "Ahri", tag1: "Mage", tag2: "Assassin", dif: 5},
    {nome: "Akali", tag1: "Assassin", tag2: undefined, dif: 7},
    {nome: "Alistar", tag1: "Tank", tag2: "Support", dif: 7}]);
  const [champ1, setChamp1] = useState(null);
  const [champ1Url, setChamp1Url] = useState("")
  const [champ1Title, setChamp1Title] = useState("")
  const [champ1Blurb, setChamp1Blurb] = useState("")
  const [champ2, setChamp2] = useState(null);
  const [champ2Url, setChamp2Url] = useState("")
  const [champ2Title, setChamp2Title] = useState("")
  const [champ2Blurb, setChamp2Blurb] = useState("")
  const [champ3, setChamp3] = useState(null);
  const [champ3Url, setChamp3Url] = useState("")
  const [champ3Title, setChamp3Title] = useState("")
  const [champ3Blurb, setChamp3Blurb] = useState("")
  const [go, setGo] = useState(false);
  const baseImgUrl = "http://ddragon.leagueoflegends.com/cdn/8.24.1/img/champion/"


  useEffect(() => {
    const getChamps = async () => {
      await api
        .post(`champs`, {
          params: {
            "tag1":tag1,
            "tag2":tag2,
          },
          champs
          
        })
        .then(({ data }) => {
          setChamp1(data.champIzi);
          setChamp2(data.champMed);
          setChamp3(data.champHard);
          setChamp1Url(baseImgUrl+data.champIzi+".png")
          setChamp2Url(baseImgUrl+data.champMed+".png")
          setChamp3Url(baseImgUrl+data.champHard+".png")
          setChamp1Title(data.champIziTitle)
          setChamp2Title(data.champMedTitle)
          setChamp3Title(data.champHarTitle)
          setChamp1Blurb(data.champIziBlurb)
          setChamp2Blurb(data.champMedBlurb)
          setChamp3Blurb(data.champHarBlurb)

        })
        .catch(e => {
          return e;
        });
    };
    if(tag1!==undefined && tag2!==undefined && go===true){
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
              "dif": aa[champ].info.difficulty,
              "blurb": aa[champ].blurb,
              "title": aa[champ].title
            };
            info.push(dict);
          }
          setChamps(info)
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
  <p style={{ fontSize: 18, fontFamily: "Eczar", color:"#ffffff" }}>Deseja aumentar sua champion pool, ou escolher seu champ com base em categorias e dificuldade? Então selecione 2 categorias para escolher o campeão perfeito!</p>
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
      Campeão de dificuldade mínima: {champ1}<br></br>
      <h2>{champ1Title}</h2>
      <img src={champ1Url} width="100" height="100"></img>
      <p>{champ1Blurb}</p>
      <br></br>
    </div>}
    </Row>
    <Row>
    {champ2!==null &&
    <div style={{ fontSize: 18, fontFamily: "Eczar", color:"#ffffff" }}>
      Campeão de dificuldade média: {champ2}<br></br>
      <h2 style={{color:"#000000"}}>{champ2Title}</h2>
      <img src={champ2Url} width="100" height="100"></img>
      <p style={{color:"#000000"}}>{champ2Blurb}</p>
      <br></br>
    </div>}
    </Row>
    <Row>
    {champ3!==null &&
    <div style={{ fontSize: 18, fontFamily: "Eczar", color:"#ffffff" }}>
      Campeão de dificuldade máxima: {champ3}<br></br>
      <h2 style={{color:"#000000"}}>{champ3Title}</h2>
      <img src={champ3Url} width="100" height="100"></img>
      <p style={{color:"#000000"}}>{champ3Blurb}</p>
      <br></br>
    </div>
    }
    </Row>
  </Container>
  
</div>
  )
  }

export default App;