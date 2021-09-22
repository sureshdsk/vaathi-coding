import React, { useRef, useEffect, useState } from "react";
import CodeConsole from "../../../components/Tabs";
import Button from "@material-ui/core/Button";
import Editor from "@monaco-editor/react";
import { Remark } from "react-remark";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PageTemplate from "../../../components/Page";
import { useRouter } from "next/router";
import { fetcher } from "../../../utils";
import useSWR from "swr";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function Exercise() {
  const router = useRouter();
  const { slug } = router.query;
  const classes = useStyles();
  const editorRef = useRef(null);
  const { data: exercise, error } = useSWR(`/api/exercise/${slug}`, fetcher);

  const [codeResult, setCodeResult] = React.useState(
    "Output will be displayed here"
  );
  const [outputStatus, setOutputStatus] = React.useState(null);

  useEffect(() => {
    (async () => {
      await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.17.0/full/",
      });
      // console.log(pyodide.runPython(`
      //     import sys
      //     print(sys.version)
      // `));
    })();
  }, []);

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToast(false);
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleEditorChange(value, event) {
    // here is the current value
  }

  function handleEditorDidMount(editor, monaco) {
    console.log("onMount: the editor instance:", editor);
    console.log("onMount: the monaco instance:", monaco);
    editorRef.current = editor;
  }

  function handleEditorWillMount(monaco) {
    console.log("beforeMount: the monaco instance:", monaco);
  }

  function handleEditorValidation(markers) {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }
  async function showValue() {
    // alert(editorRef.current.getValue());
    try {
      await pyodide.runPythonAsync(`
      import sys
      import io
      sys.stdout = io.StringIO()
  `);
      await pyodide.runPythonAsync(editorRef.current.getValue());
      await pyodide.runPythonAsync(exercise.data.test_run_code);
      const userOutput = await pyodide.runPythonAsync("sys.stdout.getvalue()");
      setCodeResult(userOutput);
      setOutputStatus(userOutput.trim() == exercise.data.expectedOutput.trim());
    }catch(err){
      setCodeResult("Error in evaluating code ");
      setOutputStatus(false)
    }
    
  }
  if (error) return <div>failed to load</div>;
  if (!exercise) return <CircularProgress />;
  return (
    <PageTemplate>
      <div className={classes.root}>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Remark>{exercise.data.desc}</Remark>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Editor
              height="55vh"
              defaultLanguage="python"
              defaultValue={exercise.data.placeholder}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              beforeMount={handleEditorWillMount}
              onValidate={handleEditorValidation}
              theme="vs-dark"
              options={{ minimap: { enabled: false } }}
            />

            <CodeConsole codeResult={codeResult} outputStatus={outputStatus} />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={6} />
              <Grid item xs={6}>
                <Button onClick={showValue} variant="contained" color="primary">
                  Run Code
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </PageTemplate>
  );
}

// Exercise.getInitialProps = async (ctx) => {
//   const res = await fetch(`${BACKEND_API_HOST}/api/exercise/${ctx.query.slug}`);
//   const exercise = await res.json();
//   return { exercise: exercise.data };
// };

export default Exercise;
