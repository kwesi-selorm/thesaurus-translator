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
      url: "https://random-words5.p.rapidapi.com/getRandom",
      headers: {
        "x-rapidapi-host": "random-words5.p.rapidapi.com",
        "x-rapidapi-key": "ecd42ec1c7msh80bb4b4926400a4p154ee7jsn653b14a0cdfb",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setRandomWord(response.data);
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
        url: "https://wordsapiv1.p.rapidapi.com/words/" + randomWord,
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
    [randomWord]
  );

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
            marginBottom: "15px",
            fontFamily: "Poppins",
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
      <h3 style={{ marginTop: "40px" }}>Examples</h3>
      <ol>
        {examples.map((eg) => (
          <li>{eg}</li>
        ))}
      </ol>
    </div>
  );
}

export default LearnANewWord;
