import React from "react";
import Box from "@material-ui/core/Box";
import Link from "../components/Link";
import PageTemplate from "../components/Page";
import Grid from "@material-ui/core/Grid";

const BACKEND_API_HOST = process.env.NEXT_PUBLIC_VERCEL_URL | process.env.NEXT_BACKEND_API_HOST;

function HomePage({ exercises }) {
  const bgcolors = [
    "primary.main",
    "secondary.main",
    "error.main",
    "warning.main",
    "info.main",
    "success.main",
    "text.primary",
  ];
  // const courses = [
  //   {title: "Hello Python", id: 'hello-python'},
  //   {title: "Arithmetic operations", id: 'hello-python'},
  //   {title: "Lists", id: 'hello-python'},
  //   {title: "Dictionary", id: 'hello-python'},
  //   {title: "For loops", id: 'hello-python'},
  //   {title: "String operations", id: 'hello-python'},
  //   {title: "Fizz buzz problem", id: 'hello-python'},
  //   {title: "Data formatting", id: 'hello-python'},
  //   {title: "Vowel in a string", id: 'hello-python'},
  //   {title: "Prime number", id: 'hello-python'},
  //   {title: "Fibonacci series", id: 'hello-python'},
  // ]
  return (
    <PageTemplate>
      <Grid container spacing={1}>
        {exercises.map((exercise) => (
          <Grid key={exercise.id} item xs={12} sm={4}>
            <Box bgcolor="info.main" color="info.contrastText" p={5}>
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

HomePage.getInitialProps = async (ctx) => {
  const res = await fetch(`${BACKEND_API_HOST}/api/exercise`);
  const response = await res.json();
  console.log(response);
  return { exercises: response.data };
};

export default HomePage;
