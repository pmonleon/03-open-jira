import { CardHeader, Grid, Card, CardContent } from '@mui/material'
import type { NextPage } from 'next'
import { Layout } from '../components/layouts'
import {  EntryList, NewEntry } from '../components/ui';


const HomePage: NextPage = () => {
  return (
    <Layout title='Open Jira | Home '>
           <Grid container spacing={ 2 }>
                <Grid item xs={12} sm={4} >
                  <Card sx={{height: 'calc(100vh - 100px)'}}>
                        <CardHeader title="Pendientes"/>
                        <CardContent>
                          {/* Agregar nueva entrada */}
                          <NewEntry />
                          {/* Listado de las entradas */}
                          <EntryList status='pending' />
                        </CardContent>
                  </Card> 
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card sx={{height: 'calc(100vh - 100px)'}}>
                        <CardHeader title="En Progreso"/>
                        <CardContent>
                          {/* <NewEntry /> */}
                          <EntryList status='in progress' />
                        </CardContent>
                   </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card sx={{height: 'calc(100vh - 100px)'}}>
                        <CardHeader title="Completadas"/>
                        <CardContent>
                          {/* <NewEntry /> */}
                          <EntryList status='finished' />
                        </CardContent>
                    </Card>
                </Grid>
           </Grid>
    </Layout>
  
  )
}

export default HomePage
