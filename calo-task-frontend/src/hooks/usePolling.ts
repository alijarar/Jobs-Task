import { useEffect, useRef } from 'react';

type CallbackFunction = () => void;

function usePolling(callback: CallbackFunction, delay: number | null) {
  const savedCallback = useRef<CallbackFunction | undefined>(undefined);

  // Update the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the polling interval
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    
    if (delay !== null && delay >= 0) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default usePolling;
