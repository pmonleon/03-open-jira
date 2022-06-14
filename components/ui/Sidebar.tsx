import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import React, { useContext } from 'react'
import { UIContext } from '../../context/ui';

const menuItems: string[] = [
    "Inbox",
    "Starred",
    "Send Email",
    "Drafts"
]

export const Sidebar = () => {

    const { sideMenuOpen, closeSidebar } = useContext(UIContext)
   

  return (
          <Drawer
            anchor={'left'}
            open={sideMenuOpen}
            onClose={() => closeSidebar()}
          >
            <Box sx={{width: 250}}>
                <Box sx={{
                    padding: '5px 10px'
                }}>
                    <Typography variant='h4'> Menú </Typography>
                </Box>
                <List>
                    {
                        menuItems.map((item, index) =>(
                            <ListItem key={index} button>
                                <ListItemIcon> 
                                    {index % 2 ? 
                                    <InboxOutlinedIcon /> : 
                                    <EmailOutlinedIcon />
                                    }
                                </ListItemIcon>
                                <ListItemText primary={item} />
                            </ListItem>
                        ))
                    }
                </List>
                < Divider />
                <List>
                    {
                        menuItems.map((item, index) =>(
                            <ListItem key={index} button>
                                <ListItemIcon> 
                                    {index % 2 ? 
                                    <InboxOutlinedIcon /> : 
                                    <EmailOutlinedIcon />
                                    }
                                </ListItemIcon>
                                <ListItemText primary={item} />
                            </ListItem>
                        ))
                    }
                </List>

            </Box>
          </Drawer>
  )
}
