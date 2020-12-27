import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";

const Wrapper = styled.div`
  text-align: center;
`;

const Time = styled.span`
  margin-top: 50vh;
  transform: translate(0, -50%);
  color: #00a6d7;
  background: #0071b4;
  display: inline-block;
  font-size: min(15vw, 75vh);
  line-height: min(15vw, 75vh);
  font-weight: 100;
  font-family: monospace;
  box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
  text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`;

const getTimeString = () => {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Clock = () => {
  const [timeString, setTimeString] = useState(getTimeString());
  const initializeTime = () => {
    setTimeString(getTimeString());
    setTimeout(initializeTime, 1000);
  };
  useEffect(initializeTime);
  return (
    <Wrapper>
      <Time>{timeString}</Time>
    </Wrapper>
  );
};

export default Clock;
