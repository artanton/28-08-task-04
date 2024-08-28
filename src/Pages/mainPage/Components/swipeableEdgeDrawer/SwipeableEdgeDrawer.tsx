import { TaskForm } from '../taskForm/taskForm';

import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';



const  TemporaryDrawer:FC =()=> {
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen:boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <Button variant="contained" onClick={toggleDrawer(true)}>
        Create Task
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: '50vw' }} role="presentation">
          <Box sx={{ p: 2 }}>
            <h2
              style={{
                padding: 10,
              }}
            >
              Add New Task
            </h2>
            <Divider />
            <TaskForm onClose={toggleDrawer(false)} />
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}
export default TemporaryDrawer

