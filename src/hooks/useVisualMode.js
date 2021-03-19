import React, {useState} from 'react'

export default function useVisualMode(props) {
  const [mode, setMode] = useState(props);
  const [history, setHistory] = useState([props]);
  
  function transition(props, replace = false) {
    if (replace) {
      history[history.length - 1] = props
      setHistory(history);
      setMode(props);
    } else {
      setHistory([...history, props]);
      setMode((prevState) => {
        return props;
      });
    }
  }
  function back() {
    history.length > 1 &&
      setHistory((prevState) => {
        setHistory(prevState.slice(0, -1));
        setMode(prevState[history.length - 2]);
        return mode;
      });
  }

  return {mode, transition, back};
}
