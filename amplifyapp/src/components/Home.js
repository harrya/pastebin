import React, { useEffect } from "react";
import styles from "./mystyle.module.css";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import { API } from "aws-amplify";
import { useState } from "react";
import { TextField } from "@mui/material";
import { style } from "@mui/system";

const Home = (props) => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const submitText = () => {
    const payload = { body: { text: text } };
    console.log("submitting", payload);
    API.post("apipastebin", "/text", payload).then((response) => {
      console.log("responee", response);
      navigate(`text/${response}`);
      // encode base64?
      // respond with the unique id
      // then redirect to page with unique id eg /text/:uniqueId
    });
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Submit text anonomously!</h1>
      <TextField
        label="Text to submit"
        multiline
        rows={4}
        placeholder="Type your text here..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <Button
        variant="contained"
        disabled={text.length === 0}
        onClick={() => submitText()}
        className={styles.button}
      >
        Submit text
      </Button>
    </div>
  );
};

export default Home;