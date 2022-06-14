import { Box } from '@mui/material'
import Head from 'next/head'
import React, { FC } from 'react'
import { Sidebar } from '../ui';
import { Navbar } from '../ui/Navbar';


interface Props {
    title?: string
    children: JSX.Element
}

export const Layout:FC<Props> = ({title = 'OpenJira', children}) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
        <Head>
            <title>{title}</title>
        </Head>
        {/* Navbar */}
        <Navbar />
        {/* Sidebar */}
        <Sidebar />
        <Box sx={{
            padding: '10px 20px'
        }}>
            { children }
        </Box>
      
    </Box>
  )
}
