import React from "react";
import PageTemplate from "../components/Page";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function AboutPage() {
  return (
    <PageTemplate>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            <br />
            Welcome to Vaathi Coding App! <br />
            This is an interactive web application where you can practise
            writing python code right on your browser.
          </Typography>
        </Grid>
      </Grid>
    </PageTemplate>
  );
}

export default AboutPage;
