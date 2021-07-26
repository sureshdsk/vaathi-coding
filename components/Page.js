import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '../components/Link';
import { UserButton } from "@clerk/clerk-react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
        flexGrow: 1,
      }
  }));
  
 
export default function PageTemplate({ children }) {
    const classes = useStyles();
    

    return (
        <>
        <div className={classes.root}>
        
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Vaathi
                </Typography>
                <Button variant="outlined" color="inherit" >
                    <Link color="inherit" href="/">
                    Home
                    </Link>
                </Button>
                <Button variant="outlined" color="inherit" href="/code-editor" >
                    <Link color="inherit" href="/code-editor">
                    About
                    </Link>
                </Button>
                
                <UserButton />
                    
                </Toolbar>
            </AppBar>
        
                <Container>
                    {children}
                </Container>
                
        </div>
        </>
    );
}
