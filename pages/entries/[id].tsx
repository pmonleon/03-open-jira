import { capitalize, Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, Radio,FormControl, FormLabel, RadioGroup, FormControlLabel, IconButton } from '@mui/material'
import React, { ChangeEvent, FC, useContext, useMemo, useState } from 'react'
import { Layout } from '../../components/layouts'
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import { EntryStatus } from '../../interfaces';
import { GetServerSideProps } from 'next'
import mongoose from 'mongoose';
import { dbEntries } from '../../database';
import { Entry } from '../../interfaces/entry';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { dateFunctions } from '../../utils';


type Form = { 
    inputValue: string;
    status: EntryStatus; 
}

const validsStatus: EntryStatus[] = ["pending", "in progress", "finished"]

interface Props {
    entry: Entry;
}

const EntryPage:FC<Props> = ({entry}) => {

    const {onEntryUpdate} = useContext(EntriesContext)

    const [inputValue, setinputValue] = useState(entry.description)
    const [status, setstatus] = useState<EntryStatus>(entry.status)

    const [touched, settouched] = useState(false)

    const isNotValid = useMemo(() => (inputValue.length <= 0 && touched), [touched, inputValue])

    const onTextFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setinputValue(event.target.value)
    }

    const onSatusChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setstatus(event.target.value as EntryStatus)
    }

    const onSumbit = ({inputValue, status}:Form) => {
        console.log(inputValue, status)

        if (inputValue.trim().length === 0) {
            return
        }

        const entryToUpdate: Entry = {
            ...entry,
            description: inputValue,
            status,
        }
        onEntryUpdate(entryToUpdate, true)
    }


  return (
    <Layout title={inputValue.substring(0,20) + '...'}>
        <>
        <Grid
            container
            justifyContent={'center'}
            sx={{
                marginTop: 2
            }}
        >
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardHeader 
                        title={`Entrada: ${inputValue}`}
                        subheader={`Creada hace ${dateFunctions.getFormatDistanceToNow(entry.createdAt) }`}
                    />
                    <CardContent>
                        <TextField 
                            sx={{
                                marginTop: 2,
                                marginBottom: 1,
                            }}
                            fullWidth
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva entrada'
                            value={inputValue}
                            onChange={onTextFieldChange}
                            onBlur={()=> settouched(true)}
                            helperText={ isNotValid && 'Ingrese un valor'}
                            error = { isNotValid }
                        />
                       <FormControl>
                            <FormLabel>
                                Estado:
                            </FormLabel>
                            <RadioGroup 
                                row
                                value={status}
                                onChange={ onSatusChange }
                            >
                                    {validsStatus.map(option => (
                                        <FormControlLabel 
                                            key={option} 
                                            value={option}
                                            control={<Radio />}
                                            label={ capitalize(option)}
                                        />                                                                     
                                    ))}
                            </RadioGroup>
                       </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button
                            startIcon={<SaveAsOutlinedIcon />}
                            variant='contained'
                            fullWidth
                            onClick={ () => onSumbit({inputValue, status}) }
                            disabled={ inputValue.length <= 0 }
                        >
                            Save
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
        <IconButton sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            backgroundColor: 'error.dark'
        }}>
            < DeleteSweepOutlinedIcon />
        </IconButton>
        </>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({params}) => {
   // const { data } = await  // your fetch function here 

   const { id } = params as {id:string}

   const entry = await dbEntries.getEntryById(id as string)

   if (!mongoose.isValidObjectId(id) || !entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
   }
 
    return {
        props: {
            entry: JSON.parse(JSON.stringify(entry))
        }
    }
}

export default EntryPage