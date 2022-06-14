import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import React, { DragEvent, FC, useContext } from 'react'
import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';

interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({entry}) => {

    const {startDragging, endDragging } = useContext(UIContext)

    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        console.log(entry, event)
        event.dataTransfer.setData('text', entry._id)
        // MODIFICAR EL STATE PARA INDICAR QUE SE ESTA HACIENDO DRAG
        startDragging()
    }

    const onDragEnd = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        // cancelar onrag
        endDragging()
    }

  return (
    <Card
        sx={{  marginBottom: '1px', }}
        // eventos de drag
        draggable
        onDragStart={(e) => onDragStart(e)}
        onDragEnd = {(e) => onDragEnd(e)}
    >
        <CardActionArea>
            <CardContent>
                <Typography sx={{
                    whiteSpace: 'pre-line'
                }}>
                   {entry.description}
                </Typography>
            </CardContent>
            <CardActions sx={{
                display: 'flex',
                justifyContent: 'end',
                
            }}>
                <Typography variant='body2'>
                   hace 30 minutos
                </Typography>
            </CardActions>
        </CardActionArea>

    </Card>
  )
}
