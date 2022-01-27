import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import { TextField } from "@mui/material";

function WordSearch() {
  const [searchWord, setSearchWord] = useState("word");
  const [definitions, setDefinitions] = useState([]);
  const definitionsUrl =
    "https://wordsapiv1.p.rapidapi.com/words/clean/definitions";

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      setSearchWord(event.target.value);
      event.preventDefault();
    }
  }

  function getDefinitions() {
    const response = axios.get(definitionsUrl);
    setDefinitions(response.data);
  }

  useEffect(function () {
    const options = {
      method: "GET",
      url: definitionsUrl,
      headers: {
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": "ecd42ec1c7msh80bb4b4926400a4p154ee7jsn653b14a0cdfb",
      },
    };
    axios.request(options);
    getDefinitions();
  }, []);

  return (
    <div className="main-section-item">
      <div className="main-section-item-title">
        <h1>Word Search</h1>
      </div>

      <form>
        <TextField
          variant="outlined"
          autoComplete="off"
          type="text"
          name="search-input"
          placeholder="Search for word"
          size="small"
          onKeyDown={handleKeyDown}
        ></TextField>
      </form>

      <div className="box">
        <h2>{searchWord}</h2>
        <h5>[pronounciation]</h5>
      </div>
    </div>
  );
}

export default WordSearch;
