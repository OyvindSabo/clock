import { useEffect, useState } from "react";
import styled from "styled-components";
import "./Clock.css";

const ClockWrapper = styled.div`
  position: fixed;
  width: 100%;
  text-align: center;
  font-size: 50vmin;
  color: white;
  line-height: 100vh;
  font-family: digital-clock-font;
`;

const getNewTimeString = () => {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Clock = () => {
  const [timeString, setTimeString] = useState(getNewTimeString());
  const initializeTime = () => {
    setTimeString(getNewTimeString());
    setTimeout(initializeTime, 1000);
  };
  useEffect(initializeTime);
  return <ClockWrapper>{timeString}</ClockWrapper>;
};

export default Clock;
