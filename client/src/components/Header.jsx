import React from 'react';
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText, makeStyles, Container } from '@material-ui/core';
import { Home } from '@material-ui/icons';

// navigation bar styles uses makeStyles which allows us to add CSS styling in JavaScript


//navigation links
const navLinks = [
  {title: 'write journal entry', path: '/entry'},
  {title: 'memories', path: '/memory'}
];

//Header function
const Header = () => {

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
