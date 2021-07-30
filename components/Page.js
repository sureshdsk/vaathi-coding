import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "../components/Link";
import { UserButton, useClerk, SignedIn, SignedOut } from "@clerk/clerk-react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const SignInButton = () => {
  const { openSignIn } = useClerk();
  return (
    <Button onClick={() => openSignIn({})} variant="contained" color="default">
      SignIn
    </Button>
  );
};

export default function PageTemplate({ children }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link color="inherit" href="/">
                Vaathi Coding
              </Link>
            </Typography>
            <Button
              variant="outlined"
              className={classes.menuButton}
              color="inherit"
            >
              <Link color="inherit" href="/">
                View All Exercises
              </Link>
            </Button>
            <Button
              variant="outlined"
              className={classes.menuButton}
              color="inherit"
              href="/code-editor"
            >
              <Link color="inherit" href="/about">
                About
              </Link>
            </Button>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </Toolbar>
        </AppBar>

        <Container>{children}</Container>
      </div>
    </>
  );
}
