import { createContext, useEffect, useState } from "react";

export let TokenContext = createContext();

export default function TokenContextProvider(props) {
  const [token, setToken] = useState(null);
  useEffect(() => {
    //when component Did Mount--> y3ny fe 7alet elRefresh
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {props.children}
    </TokenContext.Provider>
  );
}
