import { createContext, useState } from 'react';

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [colorMode, setColorMode] = useState(0);
  const context = { loggedIn, setLoggedIn, colorMode, setColorMode };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
