import React from "react";
import { useParams } from "react-router-dom";

import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Text = (props) => {
  let params = useParams();
  const [text, setText] = useState("");
  const navigate = useNavigate();

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
