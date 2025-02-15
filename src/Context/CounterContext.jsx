import { createContext, useState } from "react";

export let CounteContext = createContext();

export default function CounterContextProvider(props) {
  console.log(props);
  const [counter, setCounter] = useState(20);
  return (
    //value={{ counter, setCounter }} makes the counter state and the setCounter updater function accessible to all components that use CounteContext.
    <CounteContext.Provider value={{ counter, setCounter }}>
      {/* The children prop ensures that all child components wrapped by <CounterContextProvider> are rendered. */}
      {props.children}
    </CounteContext.Provider>
  );
}
