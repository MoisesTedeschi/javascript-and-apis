import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const API_KEY = "Api Key Here";
  
  function searchForPlayer(event) {
    let APICallString = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${searchText}?api_key=${API_KEY}`;
    
    axios.get(APICallString).then(function (response) {
      setPlayerData(response.data);
    }).catch(function (error) {
      //Error
      console.log(error);
    });
  }

  return (
    <div className="App">
      <div className="container">
        <h5>League of Legends Player Searcher</h5>
        <input type="text" onChange={e => setSearchText(e.target.value)} />
        <button onClick={e => searchForPlayer(e)}>Search for player</button>
      </div>

      {JSON.stringify(playerData) != '{}' ? 
        <>
          <p>Nome do Jogador: {playerData.name}</p>
          <p>Level: {playerData.summonerLevel}</p>
        </>
        :
        <><p>No player data</p></>
      }

    </div>
  );
}

export default App;
