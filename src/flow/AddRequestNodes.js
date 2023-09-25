import { useRef, useState } from "react";

//mui
import { Fab, Popper, Fade, Paper, Typography, Box, Stack, List, ListItemButton, ListItem, ListItemText, Divider, Card } from "@mui/material";
import { blue, green } from '@mui/material/colors';

// icons
import { IconMinus, IconPlus } from '@tabler/icons-react';

import PerfectScrollbar from 'react-perfect-scrollbar'

const fabStyle = {
    position: 'absolute',
    bottom: 20,
    right: 15,
}
  
const fabGreenStyle = {
    color: 'common.white',
    bgcolor: blue[500],
    '&:hover': {
        bgcolor: blue[600],
    },
}

const AddRequestNodes = () => {
    const [open, setOpen] = useState(false)
    const anchorRef = useRef(null);
    const ps = useRef()

    const nodes = [{"name":"GET", "label":"GET", "description":"GET Descr"}, {"name":"POST", "label":"POST", "description":"POST desc"}]

    const onDragStart = (event, node) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify(node))
        event.dataTransfer.effectAllowed = 'move'
    }

    return (
        <>
            <Fab
                color= 'inherit'
                aria-label='Add'
                title="Add Node"
                sx= {{ ...fabStyle, ...fabGreenStyle }}
                onClick={() => setOpen(!open)}
                ref={anchorRef}
            >
                {open ? <IconMinus /> : <IconPlus />}
            </Fab>
            <Popper 
                open={open} 
                anchorEl={anchorRef.current} 
                placement='top' 
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [-40, 14]
                            }
                        }
                    ]
                }}
                sx={{ zIndex: 1000 }}
            >
                {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                        <Card
                            elevation={16}
                        >
                            <Box sx={{ p: 2 }}>
                                <Stack>
                                    <Typography variant='h6'>Add Nodes</Typography>
                                </Stack>
                            </Box>
                            <PerfectScrollbar
                                containerRef={(el) => {
                                    ps.current = el
                                }}
                                style={{ height: '100%', maxHeight: 'calc(100vh - 320px)', overflowX: 'hidden' }}
                            >
                                <Box sx={{ p: 2 }}>
                                    <List
                                        sx={{
                                            width: '100%',
                                            maxWidth: 370,
                                            borderRadius: '10px',
                                            padding: '16px',
                                            '& .MuiListItemSecondaryAction-root': {
                                                top: 22
                                            },
                                            '& .MuiDivider-root': {
                                                my: 0
                                            },
                                            '& .list-container': {
                                                pl: 7
                                            }
                                        }}
                                    >
                                        {nodes.map((node, index) => (
                                            <div
                                                key={node.name}
                                                onDragStart={(event) => onDragStart(event, node)}
                                                draggable
                                                cursor='move'
                                            >
                                                <ListItemButton>
                                                    <ListItem alignItems='center'>
                                                        <ListItemText
                                                            sx={{ ml: 1 }}
                                                            primary={node.label}
                                                            secondary={node.description}
                                                        />
                                                    </ListItem>
                                                </ListItemButton>
                                                {index === nodes.length - 1 ? null : <Divider />}
                                            </div>
                                        ))}
                                    </List>
                                </Box>
                            </PerfectScrollbar>
                        </Card>
                    </Paper>
                </Fade>
                )}
            </Popper>
        </>
    )
}

export default AddRequestNodes;