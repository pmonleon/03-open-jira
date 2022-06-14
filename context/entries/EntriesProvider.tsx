import { FC, ReactNode, useReducer } from "react";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import { v4 as uuidv4 } from "uuid";

interface Props {
  children: ReactNode;
}

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        "Pendiente: Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      status: "pending",
      createAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        "En progreso: It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      status: "in progress",
      createAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        "Terminada: There are many variations of passages of Lorem Ipsum available.",
      status: "finished",
      createAt: Date.now(),
    },
  ],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addEntry = (data:string) => {
        const newEntry:Entry = {
          _id: uuidv4(),
          description: data,
          status: 'pending',
          createAt: Date.now(),
        }
        dispatch({
          type: '[Entry] - Add-Entry',
          payload: newEntry
        })
  }

  const onEntryUpdate = (data:Entry) => {
    dispatch({
      type: '[Entry] - Update-Entry',
      payload: data
    })
  }

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
