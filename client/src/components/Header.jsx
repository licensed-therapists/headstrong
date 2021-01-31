import React from 'react';
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText, makeStyles, Container, Button } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import axios from 'axios';

// navigation bar styles uses makeStyles which allows us to add CSS styling in JavaScript


//navigation links
const navLinks = [
  {title: 'write journal entry', path: '/entry'},
  {title: 'memories', path: '/memory'}
];

//Header function
const Header = ({ logout }) => {

  const navStyles = makeStyles({
    navDisplayFlex: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    linkText: {
      textDecoration: 'none',
      textTransform: 'uppercase',
      color: 'white'
    }
  });

  const styles = navStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="md" className={styles.navbarDisplayFlex}>
          <IconButton edge="start" color="inherit" aria-label="home" className={styles.navDisplayFlex}>
            <Home fontSize="large" />
            <Button style={{backgroundColor: 'white', marginLeft: '90%'}} onClick={() => {
              axios.delete('/logout')
                .then(({ data }) => logout(data))
                .catch((err) => console.warn(err));
            }}>Logout</Button>
          </IconButton>

          <List component="nav" aria-labelledby="main navigation">
            {navLinks.map(({ title, path }) => (
              <a href={path} key={title} className={styles.linkText}>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </a>
            ))}
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
