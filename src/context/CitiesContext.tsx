import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface CitiesProviderProps {
  children: ReactNode;
}
export interface CityType {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  id: string;
  position: {
    lat: number;
    lng: number;
  };
}

interface CitiesContextType {
  cities: CityType[];
  isLoading: boolean;
}

export const CitiesContext = createContext<CitiesContextType | null>(null);
const BASE_URL = 'http://localhost:8000';

function CitiesProvider({ children }: CitiesProviderProps) {
  const [cities, setCities] = useState<CityType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);
  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context) throw new Error('No contex provided');
  return context;
}

export { CitiesProvider, useCities };
