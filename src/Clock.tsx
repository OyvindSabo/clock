import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import { Chocolate } from "./colors";

const Wrapper = styled.div`
  text-align: center;
`;

const ChocolateInnerBar = styled.span`
  background: ${Chocolate.Regular};
  display: inline-block;
  margin-top: 50vh;
  transform: translate(0, -50%);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  padding: min(5vw, 25vh);
`;

const Time = styled.span`
  color: ${Chocolate.Regular};
  background: ${Chocolate.Dark};
  display: inline-block;
  font-size: min(15vw, 75vh);
  line-height: min(15vw, 75vh);
  font-weight: 100;
  font-family: monospace;
  box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
  text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  padding: min(5vw, 25vh);
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
      <ChocolateInnerBar>
        <Time>{timeString}</Time>
      </ChocolateInnerBar>
    </Wrapper>
  );
};

export default Clock;
