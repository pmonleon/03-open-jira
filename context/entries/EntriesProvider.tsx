import { FC, ReactNode, useEffect, useReducer } from "react";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import { entriesApi } from "../../apis";



interface Props {
  children: ReactNode;
}

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addEntry = async(data:string) => {
        const response = await entriesApi.post<Entry>('/entries',{description:data})
        dispatch({
          type: '[Entry] - Add-Entry',
          payload: response.data
        })
  }

  const onEntryUpdate = async({_id, status, description}:Entry) => {
   
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })
      dispatch({
        type: '[Entry] - Update-Entry',
        payload: data
      })
    } catch (error) {
      console.log(error)
    }
  
  }

  const refreshEntries = async() => {
    const resp = await entriesApi.get<Entry[]>('/entries');
    console.log(resp)
    const { data } = resp;
    dispatch({
      type:'[Entry] - Refresh-Data',
      payload: data
    })
  } 

  useEffect(() => {
    refreshEntries()
  }, [])
  

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        // methods
        addEntry,
        onEntryUpdate
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
