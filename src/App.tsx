import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import Clock from './Clock';

const getWakeLock = async () => {
  try {
    const wakeLock = await (navigator as any).wakeLock.request('screen');
    wakeLock.addEventListener('release', () => {
      console.log('Screen Wake Lock released:', wakeLock.released);
    });
    console.log('Screen Wake Lock released:', wakeLock.released);
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
    return null;
  }
};

const App = () => {
  const [wakeLock, setWakeLock] = useState<any>(null);
  useEffect(() => {
    getWakeLock().then(setWakeLock);
    return () => {
      if (!wakeLock) return;
      wakeLock.release();
    };
  }, []);
  return <Clock />;
};

export default App;
