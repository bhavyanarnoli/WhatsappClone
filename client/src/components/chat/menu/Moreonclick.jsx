import {MoreVert} from '@mui/icons-material';
import * as React from 'react';
import { Box, styled, Menu, MenuList,Paper, MenuItem,ClickAwayListener } from "@mui/material";
import { useState } from "react";
const MoreOnClick = () => {
  const [open, setOpen] = useState(null);
  const handleClose = () => {
    setOpen(false);
  }
  const handleClick = (event) => {
    setOpen(event.currentTarget);
  }

  return ( 
  <> 
    <MoreVert onClick ={handleClick} />

    <Menu anchorE1 = {open}
      keepMounted
      open = {open}
      onClose = {handleClose}
      getContentAnchorEl = {null} 
      anchorOrigin = {{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>           
    </>
  )
}
export default MoreOnClick;