import React, { useEffect, useState } from 'react';
import './App.css';
import Clock from './Clock';

const getWakeLock = async () => {
  try {
    const wakeLockSentinel = await navigator.wakeLock.request('screen');
    wakeLockSentinel.addEventListener('release', () => {
      console.log('Screen Wake Lock released:', wakeLockSentinel.released);
    });
    console.log('Screen Wake Lock released:', wakeLockSentinel.released);
    return wakeLockSentinel;
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
    return null;
  }
};

const doReleaseWakeLock = (wakeLockSentinel: WakeLockSentinel | null) => () => {
  if (!wakeLockSentinel) return;
  wakeLockSentinel.release();
};

const App = () => {
  const [
    wakeLockSentinel,
    setWakeLockSentinel,
  ] = useState<WakeLockSentinel | null>(null);

  useEffect(() => {
    getWakeLock().then(setWakeLockSentinel);
    return doReleaseWakeLock(wakeLockSentinel);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState !== 'visible') return;
      getWakeLock().then(setWakeLockSentinel);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return <Clock />;
};

export default App;
