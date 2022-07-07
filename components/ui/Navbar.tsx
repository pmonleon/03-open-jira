import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import React, { useContext } from 'react'
import { UIContext } from '../../context/ui';
import LinkNext from 'next/link';

export const Navbar = () => {
  const { openSidebar } = useContext(UIContext)
  return (
    <AppBar position='sticky'> 
       <Toolbar>
           <IconButton size='large' edge='start' onClick={()=> openSidebar()}> 
                <MenuOutlinedIcon />
           </IconButton>
           <LinkNext href={'/'} passHref>
              <Link underline='none' color={'white'}>
                <Typography variant='h6'>OpenJira</Typography>
              </Link>     
           </LinkNext>    
       </Toolbar>
    </AppBar>
  )
}
