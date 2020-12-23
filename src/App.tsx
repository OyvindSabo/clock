import React, { useCallback, useEffect, useState } from 'react';
import Clock from './Clock';
import { useOnce } from './utils';
import './App.css';

const getWakeLockSentinel = async () => {
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

const doAddVisibilityChangeListener = (
  handleVisibilityChange: VoidFunction
) => {
  document.addEventListener('visibilitychange', handleVisibilityChange);
};

const doRemoveVisibilityChangeListener = (
  handleVisibilityChange: VoidFunction
) => () => {
  document.removeEventListener('visibilitychange', handleVisibilityChange);
};

const App = () => {
  const [
    wakeLockSentinel,
    setWakeLockSentinel,
  ] = useState<WakeLockSentinel | null>(null);

  const handleVisibilityChange = () => {
    if (document.visibilityState !== 'visible') return;
    getWakeLockSentinel().then(setWakeLockSentinel);
  };

  useOnce(() => {
    getWakeLockSentinel().then(setWakeLockSentinel);
    return doReleaseWakeLock(wakeLockSentinel);
  });

  useOnce(() => {
    doAddVisibilityChangeListener(handleVisibilityChange);
    return doRemoveVisibilityChangeListener(handleVisibilityChange);
  });

  return <Clock />;
};

export default App;
