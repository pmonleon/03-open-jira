import { List, Paper } from "@mui/material";
import React, { DragEvent, FC, useContext, useMemo } from "react";
import { EntryCard } from "./";
import { EntryStatus } from "../../interfaces";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {

  const { entries,  onEntryUpdate } = useContext(EntriesContext)
  const { isDragging, endDragging } = useContext(UIContext)

  const entriesBySttatus = useMemo(() => entries.filter( entry => entry.status === status), [entries]) 

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
  }

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const id = event.dataTransfer.getData('text');
        console.log(id)
        const entryFiltered = entries.find(entry => entry._id === id)!;
        entryFiltered.status = status
        onEntryUpdate(entryFiltered)
        endDragging()
  }

  console.log(isDragging)
 
  return (
    // drop
    <div
      onDrop={onDropEntry}
      onDragOver={ allowDrop }
      className = {isDragging ? styles.dragging : ''}
    >
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          overflow: "scroll",
          backgroundColor: "transparent",
          padding: "3px 5px",
        }}
      >
        <List id="drop_zone" sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' , div: { marginBottom: 1} }}>
          {entriesBySttatus.map(entry => (
               <EntryCard key={entry._id} entry={entry}/>
          ))}        
        </List>
      </Paper>
    </div>
  );
};
