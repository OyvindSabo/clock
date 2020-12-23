import { useEffect } from "react";

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useOnce = (effect: React.EffectCallback) => useEffect(effect, []);