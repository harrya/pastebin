import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { StepContext, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Text = (props) => {
  let params = useParams();
  const [text, setText] = useState("");
  const navigate = useNavigate();

  console.log("hello");

  useEffect(() => {
    // fetch text with id
    API.get("apipastebin", `/text/${params.textId}`)
      .then((response) => {
        setText(response.text);
      })
      .catch((error) => {
        navigate("/404");
      });
  }, []);

  return (
    <>
      <h1>Text for {params.textId}</h1>
      <hr />
      <p>{text}</p>
    </>
  );
};

export default Text;
