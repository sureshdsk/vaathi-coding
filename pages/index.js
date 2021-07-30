import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import Link from "../components/Link";
import PageTemplate from "../components/Page";
import Grid from "@material-ui/core/Grid";
import useSWR from "swr";
import fetcher from "../utils";
import CircularProgress from "@material-ui/core/CircularProgress";

function HomePage() {
  const { data: excercises, error } = useSWR("/api/exercise", fetcher);

  const bgcolors = [
    "primary.main",
    "secondary.main",
    "error.main",
    "warning.main",
    "info.main",
    "success.main",
    "text.primary",
  ];
  if (error) return <div>failed to load</div>;
  if (!excercises) return <CircularProgress />;
  return (
    <PageTemplate>
      <Grid container spacing={1}>
        {excercises.data.map((exercise) => (
          <Grid key={exercise.id} item xs={12} sm={4}>
            <Box
              bgcolor={`${exercise.theme}.main`}
              color={`${exercise.theme}.contrastText`}
              m={4}
              p={5}
            >
              <h2>
                <Link
                  style={{ color: "black" }}
                  href={`/exercise/${exercise.id}`}
                >
                  {exercise.title}
                </Link>
              </h2>
            </Box>
          </Grid>
        ))}
      </Grid>
    </PageTemplate>
  );
}

export default HomePage;
