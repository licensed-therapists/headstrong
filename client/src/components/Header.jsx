import React from 'react';
import { AppBar, Toolbar } from "@material-ui/core";

const navlinks = [
  {title: `write journal entry`, path: `/entry`},
  {title: `memories`, path: `/memory`}
]

const Header = () => {
  return (
  <AppBar position="static">
    <Toolbar></Toolbar>
  </AppBar>
  )
}

export default Header;