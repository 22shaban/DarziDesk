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

      let logoBase64 = "";

      if (data.logoUrl) {
        try {
          const response = await fetch(data.logoUrl);

          const blob = await response.blob();

          logoBase64 = await new Promise((resolve) => {
            const reader = new FileReader();

            reader.onloadend = () => resolve(reader.result);

            reader.readAsDataURL(blob);
          });
        } catch (error) {
          console.error("Failed to create Base64 logo.", error);
        }
      }

      setShop({
        ...data,
        logoBase64,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ShopContext.Provider
      value={{
        shop,
        setShop,
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