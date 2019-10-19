import React, { useState, useEffect} from "react";
// import api from "./services/api";
import lol from "riot-lol";
import MultiSelect from 'react-native-multiple-select';



function App() {
  const types = [
    {"id":"Fighter", "name":"Fighter"}, 
    {"id":"Mage", "name":"Mage"},
    {"id":"Assassin", "name":"Assassin"}, 
    {"id":"Support", "name":"Support"}, 
    {"id":"Marksman", "name":"Tank"}
  ];
  var selectedItems = [] 

  const [currency, setCurrency] = useState(defaultCurrency);

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  lol.getChampions().then(champions => {
    console.log(champions);
  });
    
  return(<h1>aa</h1>
  )
}
export default App;