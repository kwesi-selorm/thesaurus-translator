import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

function LearnANewWord() {
  const [randomWord, setRandomWord] = useState("");

  const [pronounciation, setPronounciation] = useState("");
  const [definitions, setDefinitions] = useState([]);
  const [examples, setExamples] = useState([]);

  //Generate random word
  function handleClick() {
    const options = {
      method: "GET",
      url: "https://random-words-api.vercel.app/word",
    };

    axios
      .request(options)
      .then(function (response) {
        setRandomWord(response.data[0].word);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(handleClick, []);

  //Generate the details
  useEffect(
    function () {
      const options = {
        method: "GET",
        url: "https://api.dictionaryapi.dev/api/v2/entries/en/" + randomWord,
      };
      axios
        .request(options)
        .then(function (response) {
          let defs = [];
          let egs = [];

          const wordInfo = response.data[0];
          console.log(wordInfo);
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
    [randomWord]
  );

  // if (!randomWord) return null;

  return (
    <div className="main-section-item">
      <h1 className="main-section-item-title">Learn A New Word</h1>
      <form>
        <Button
          type="button"
          color="warning"
          onClick={handleClick}
          variant="outlined"
          size="large"
          style={{
            marginBottom: "1px",
            textTransform: "lowercase",
            fontWeight: "bold",
          }}
        >
          Random Word
        </Button>
      </form>
      <div id="random-word-box" className="box">
        <h2 className="random-word">{randomWord}</h2>
        <h3>[{pronounciation}]</h3>
      </div>

      <h3 style={{ marginTop: "40px" }}>Definitions</h3>
      <ol>
        {definitions.map((def) => (
          <li>{def}</li>
        ))}
      </ol>
      <h3>Examples</h3>
      <ol>
        {examples.map((eg) => (
          <li>{eg}</li>
        ))}
      </ol>
    </div>
  );
}

export default LearnANewWord;
