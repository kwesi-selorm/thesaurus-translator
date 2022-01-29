import React from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextareaAutosize,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

function Translate() {
  const [targetLanguageCode, setTargetLanguageCode] = useState("");
  const [userText, setUserText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  function handleChange(event) {
    setTargetLanguageCode(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      setUserText(event.target.value);
      event.preventDefault();
    }
  }

  useEffect(
    function () {
      const options = {
        method: "POST",
        url: "https://microsoft-translator-text.p.rapidapi.com/translate",
        params: {
          to: targetLanguageCode,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "content-type": "application/json",
          "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
          "x-rapidapi-key":
            "ecd42ec1c7msh80bb4b4926400a4p154ee7jsn653b14a0cdfb",
        },
        data: [
          {
            Text: userText,
          },
        ],
      };

      axios
        .request(options)
        .then(function (response) {
          setTranslatedText(response.data[0].translations[0].text);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    [userText, targetLanguageCode]
  );

  return (
    <div className="main-section-item">
      <div className="main-section-item-title">
        <h1>Translate</h1>
      </div>
      <FormControl style={{ width: "60%" }}>
        <InputLabel id="language-label" style={{ color: "brown" }}>
          Translate to...
        </InputLabel>
        <Select
          defaultValue=""
          labelId="languages-label"
          id="languages"
          label="Language"
          onChange={handleChange}
          variant="standard"
          color="warning"
        >
          <MenuItem value="fr">French</MenuItem>
          <MenuItem value="de">German</MenuItem>
          <MenuItem value="no">Norwegian</MenuItem>
          <MenuItem value="es">Spanish</MenuItem>
          <MenuItem value="sv">Swedish</MenuItem>
        </Select>
      </FormControl>

      <TextareaAutosize
        className="user-text"
        onKeyDown={handleKeyDown}
        label="Enter word or phrase"
        color="warning"
        variant="outlined"
        minRows={4}
        placeholder="Enter word/text"
        style={{
          backgroundColor: "#b3541e",
          border: "1px solid #fff",
          borderRadius: "10px",
          color: "#fff",
          justifyContent: "center",
          width: "60%",
        }}
      />

      <div className="translated-text">
        <h3>Translated text</h3>
        <p style={{ padding: "10px" }}>{translatedText}</p>
      </div>
    </div>
  );
}

export default Translate;
