import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';

const Time = styled.div`
  font-size: min(25vw, 100vh);
  text-align: center;
  line-height: 100vh;
`;

const getTimeString = () => {
  return new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const Clock = () => {
  const [timeString, setTimeString] = useState(getTimeString());
  const initializeTime = () => {
    setTimeString(getTimeString());
    setTimeout(initializeTime, 1000);
  };
  useEffect(initializeTime);
  return <Time>{timeString}</Time>;
};

export default Clock;
