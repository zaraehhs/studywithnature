"use client";

import { createContext, useState } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const openMobileMenu = () => {
    setIsMenuVisible(true);
  };

  const closeMobileMenu = () => {
    setIsMenuVisible(false);
  };

  return (
    <MenuContext.Provider value={{ isMenuVisible, openMobileMenu, closeMobileMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;