import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

function ModalContextProvider({ children }) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(true);
  };

  return (
    <ModalContext.Provider
      value={{
        showDetails,
        toggleDetails,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContextProvider;
