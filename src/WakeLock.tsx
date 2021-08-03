import { useState } from "react";
import { useOnce } from "./utils";

const getWakeLockSentinel = async () => {
  try {
    const wakeLockSentinel = await navigator.wakeLock.request("screen");
    wakeLockSentinel.addEventListener("release", () => {
      console.log("Screen Wake Lock released:", wakeLockSentinel.released);
    });
    console.log("Screen Wake Lock released:", wakeLockSentinel.released);
    return wakeLockSentinel;
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
    return null;
  }
};

const WakeLock = () => {
  const [wakeLockSentinel, setWakeLockSentinel] = useState<WakeLockSentinel | null>(null);

  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible") return;
    getWakeLockSentinel().then(setWakeLockSentinel);
  };

  useOnce(() => {
    getWakeLockSentinel().then(setWakeLockSentinel);
    return () => {
      wakeLockSentinel?.release();
    };
  });

  useOnce(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  });

  return null;
};

export default WakeLock;
