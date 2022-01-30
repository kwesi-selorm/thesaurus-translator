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

  useEffect(
    function () {
      const options = {
        method: "GET",
        url: "https://api.dictionaryapi.dev/api/v2/entries/en/" + searchWord,
      };
      axios
        .request(options)
        .then(function (response) {
          let defs = [];
          let egs = [];

          const wordInfo = response.data[0];
          const meanings = wordInfo.meanings[0].definitions;

          for (let i = 0; i < meanings.length; i++) {
            defs.push(meanings[i].definition);
            egs.push(meanings[i].example);
          }

          setPronounciation(wordInfo.phonetic);
          setDefinitions(defs);
          setExamples(egs);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    [searchWord]
  );

  return (
    <div className="main-section-item">
      <div className="main-section-item-title">
        <h1>Word Search</h1>
      </div>
      <form>
        <FilledInput
          className="word-search-input"
          color="warning"
          variant="standard"
          autoComplete="off"
          type="text"
          name="search-input"
          placeholder="Search for word"
          size="small"
          onKeyDown={handleKeyDown}
          style={{ padding: "4px" }}
          startAdornment={
            <InputAdornment position="start" style={{ flexWrap: "wrap" }}>
              <SearchIcon></SearchIcon>
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
          <li>{eg}</li>
        ))}
      </ol>
    </div>
  );
}

export default WordSearch;
