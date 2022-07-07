import { FC, ReactNode, useEffect, useReducer } from "react";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import { entriesApi } from "../../apis";
import { useSnackbar } from 'notistack';


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

  const { enqueueSnackbar } = useSnackbar();

  const addEntry = async(data:string) => {
        const response = await entriesApi.post<Entry>('/entries',{description:data})
        dispatch({
          type: '[Entry] - Add-Entry',
          payload: response.data
        })
  }

  const onEntryUpdate = async({_id, status, description}:Entry, showSnackBar:boolean) => {
   
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })
      dispatch({
        type: '[Entry] - Update-Entry',
        payload: data
      })
      showSnackBar && enqueueSnackbar('Entrada actrualizada', {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical:'top',
          horizontal:'right'
        }
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
