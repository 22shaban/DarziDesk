import { createContext, useContext, useEffect, useState } from "react";
import { getSettings } from "../services/settingsApi";

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [shop, setShop] = useState(null);

  useEffect(() => {
    loadShop();
  }, []);

  async function loadShop() {
    try {
      const data = await getSettings();
      setShop(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ShopContext.Provider
      value={{
        shop,
        refreshShop: loadShop,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}