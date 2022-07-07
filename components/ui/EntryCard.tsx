import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { DragEvent, FC, useContext } from 'react'
import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';
import { dateFunctions } from '../../utils';


interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({entry}) => {

    const { push } = useRouter();

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

    const onClick = () => {
        push(`/entries/${entry._id}`)
    }

  return (
    <Card
        sx={{  marginBottom: '1px', }}
        // eventos de drag
        draggable
        onDragStart={(e) => onDragStart(e)}
        onDragEnd = {(e) => onDragEnd(e)}
        onClick={ onClick }
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
                   {dateFunctions.getFormatDistanceToNow(entry.createdAt)}
                </Typography>
            </CardActions>
        </CardActionArea>

    </Card>
  )
}
