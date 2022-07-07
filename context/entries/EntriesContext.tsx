import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProps {
   entries: Entry[];
   addEntry: (data:string) => void;
   onEntryUpdate: (data:Entry, showSnackBar: boolean) => void
}

export const EntriesContext = createContext({} as ContextProps);