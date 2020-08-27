import React from "react";

function JeopardyDisplay(props) {
  return (
    <div>
      <strong>Category: </strong> {props.category} <br />
      <strong>Question: </strong> {props.question} <br />
      <strong>Value: </strong> {props.value} <br />
      <strong>Score: </strong> {props.score} <br /> <br />
    </div>
  );
}

export default JeopardyDisplay;
