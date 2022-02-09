import React from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextareaAutosize,
  Button,
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

  function handleClick() {
    const textToTranslate = document.getElementById("user-text").value;
    setUserText(textToTranslate);
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
        <InputLabel
          id="language-label"
          style={{ color: "brown", fontFamily: "Poppins" }}
        >
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
          style={{ fontFamily: "Poppins" }}
        >
          <MenuItem className="language" value="fr">
            French
          </MenuItem>
          <MenuItem className="language" value="de">
            German
          </MenuItem>
          <MenuItem className="language" value="no">
            Norwegian
          </MenuItem>
          <MenuItem className="language" value="es">
            Spanish
          </MenuItem>
          <MenuItem className="language" value="sv">
            Swedish
          </MenuItem>
        </Select>
      </FormControl>

      <TextareaAutosize
        id="user-text"
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
          marginTop: "50px",
          width: "90%",
        }}
      />

      <Button
        variant="outlined"
        size="small"
        color="warning"
        onMouseDown={handleClick}
        onClick={handleClick}
        style={{ fontFamily: "Poppins" }}
      >
        Translate
      </Button>

      <div className="translated-text">
        <h3>Translated text</h3>
        <p style={{ padding: "10px" }}>{translatedText}</p>
      </div>
    </div>
  );
}

export default Translate;
