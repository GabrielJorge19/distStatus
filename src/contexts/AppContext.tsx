import { createContext, useContext, useEffect, useState } from "react";

import maintancesData from "@/service/maintances";
import getData from "@/service/distStatus";
import LoadingPage from "@/pages/LoadingPage";


type AppData = {
  hidrantes: any[];
  maintances: any;
  distStats: {[key: string]: any};
};

type AppContextType = {
  data: AppData | null;
  ready: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function bootstrap() {
      try {
        // 1️⃣ Carrega dados base em paralelo
        const [hidrantes, maintances, distStats] = await Promise.all([
          fetchHidrantes(),
          maintancesData(),
          getData()
        ]);

        setData({ hidrantes, maintances, distStats });
        setReady(true);
      } catch (err) {
        console.error("Erro no bootstrap", err);
      }
    }

    bootstrap();
  }, []);

  return (
    <AppContext.Provider value={{ data, ready }}>
      {/* {!ready && <LoadingPage />} */}
      <LoadingPage />
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp deve ser usado dentro do AppProvider");
  }
  return context;
}


function fetchHidrantes(){return []}