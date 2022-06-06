import { createContext } from 'react';

interface IcyContextType {
  apiKey?: string;
}

const IcyContext = createContext<IcyContextType>({});

export default IcyContext;
