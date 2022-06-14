import { Button, Box, TextField } from '@mui/material'
import React, { ChangeEvent, useContext, useState } from 'react'
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui/UIContext';

export const NewEntry = () => {

const [inputValue, setinputValue] = useState('')
const [touched, settouched] = useState(false)

const { addEntry } = useContext(EntriesContext)
const { isAdding, setIsAdding } = useContext(UIContext)

const onTextFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setinputValue(event.target.value)
}

const onSave = () => {
    if (!inputValue.length) return
    addEntry(inputValue)
    settouched(false)
    setIsAdding(false)
    setinputValue('')
}

  return (
    <Box sx={{
        marginBottom: 2,
        paddingX: 1
    }}>
      { isAdding ? ( <>
            <TextField 
                fullWidth
                sx={{
                    marginTop: 2,
                    marginBottom: 1
                }}
                autoFocus
                placeholder='Nueva Entrada'
                multiline
                label='Nuev entrada'
                helperText={touched && !inputValue.length && 'Ingrese un valor'}
                error={touched && !inputValue.length }
                value={inputValue}
                onChange={onTextFieldChange}
                onBlur={() => settouched(true)}
            />
            <Box sx={{
                display:'flex',
                justifyContent: 'space-between'
            }}>
                <Button 
                    variant='text' 
                    onClick={() => {
                        setIsAdding(false)
                        settouched(false)
                    }}>
                    Cancelar
                </Button>
                <Button variant='outlined' onClick={ onSave }  color='secondary' endIcon={<SaveAsOutlinedIcon />}>Guardar</Button>
            </Box>
        </>) : (
        <Button 
             variant='outlined'
             fullWidth
             startIcon={<AddCircleOutlineOutlinedIcon />}
             onClick={() => setIsAdding(true)}
         >
                 Agregar tarea
         </Button>
        )
       
       }
    </Box>
  )
}
