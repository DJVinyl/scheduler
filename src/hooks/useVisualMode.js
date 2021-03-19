import React, {useState} from 'react'

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(props);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace = false) {
    if (replace) {
      setHistory((prevState) => [...prevState.slice(0, -1), newMode]);
    } else {
      setHistory((prevState) => [...prevState, newMode]);
    }
  }
  function back() {
    history.length > 1 &&
      setHistory((prevState) => {
        const tempHistory = [...prevState];
        tempHistory.pop();
        return tempHistory;
      });
  }

  const mode = history.slice(-1)[0];
  return {mode, transition, back};
}
