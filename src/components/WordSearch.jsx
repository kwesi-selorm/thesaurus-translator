import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { FilledInput, InputAdornment } from "@mui/material";
import axios from "axios";

function WordSearch() {
  const [searchWord, setSearchWord] = useState("word");
  const [pronounciation, setPronounciation] = useState("");
  const [definitions, setDefinitions] = useState([]);
  const [examples, setExamples] = useState([]);

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      setSearchWord(event.target.value);
      event.preventDefault();
    }
  }

  function handleClick() {
    const userWord = document.getElementById("input").value;
    setSearchWord(userWord);
  }

  useEffect(
    function () {
      const options = {
        method: "GET",
        url: "https://wordsapiv1.p.rapidapi.com/words/" + searchWord,
        headers: {
          "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
          "x-rapidapi-key":
            "ecd42ec1c7msh80bb4b4926400a4p154ee7jsn653b14a0cdfb",
        },
      };
      axios
        .request(options)
        .then(function (response) {
          let defs = [];
          let egs = [];

          const wordData = response.data;
          const results = response.data.results;

          for (let i = 0; i < results.length; i++) {
            defs.push(results[i].definition);
            egs.push(results[i].examples);
          }

          setPronounciation(wordData.pronunciation.all);
          setDefinitions(defs);
          setExamples(egs);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    [searchWord, examples]
  );

  return (
    <div className="main-section-item">
      <div className="main-section-item-title">
        <h1>Word Search</h1>
      </div>
      <form>
        <FilledInput
          id="input"
          className="word-search-input"
          color="warning"
          variant="standard"
          autoComplete="off"
          type="text"
          name="search-input"
          placeholder="Search for word"
          size="small"
          onKeyDown={handleKeyDown}
          style={{ padding: "4px", fontFamily: "Poppins" }}
          endAdornment={
            <InputAdornment position="end" style={{ flexWrap: "wrap" }}>
              <SearchIcon
                className="search-icon"
                onClick={handleClick}
                onMouseDown={handleClick}
              ></SearchIcon>
            </InputAdornment>
          }
        />
      </form>
      <div className="box">
        <h2>{searchWord}</h2>
        <h3>[{pronounciation}]</h3>
      </div>
      <h3 style={{ marginTop: "40px" }}>Definitions</h3>
      <ol>
        {definitions.map((def) => (
          <li>{def}</li>
        ))}
      </ol>
      <h3 style={{ marginTop: "40px" }}>Examples</h3>
      <ol>
        {examples.map((eg) => (
          <li>{eg !== [] && eg}</li>
        ))}
      </ol>
    </div>
  );
}

export default WordSearch;
