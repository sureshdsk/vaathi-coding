import React, { useRef, useEffect, useState } from 'react';
import CodeConsole from '../../../components/Tabs';
import Button from '@material-ui/core/Button';
import Editor from "@monaco-editor/react";
import { Remark } from 'react-remark';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PageTemplate from '../../../components/Page';
import { useRouter } from 'next/router'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


export default function Index() {
  const router = useRouter()
  const { slug } = router.query
  const classes = useStyles();
  const editorRef = useRef(null);
  const [markdownSource, setMarkdownSource] = useState('');
  const [codeResult, setCodeResult] = React.useState('Output will be displayed here')
  const [outputStatus, setOutputStatus] = React.useState(null);

  const [exercise, setExercise] = React.useState({})
  

  useEffect(() => {
    let ex = {id: 'hello-world',
    desc: `
# Given an array A[] and a number x, check for pair in A[] with sum as x 
Write a program that, given an array A[] of n numbers and another number x, determines whether or not there exist two elements in S whose sum is exactly x. 

## Examples
\`\`\`
Input: arr[] = {0, -1, 2, -3, 1}
  sum = -2
Output: -3, 1
If we calculate the sum of the output,
1 + (-3) = -2

Input: arr[] = {1, -2, 1, 0, 5}
  sum = 0
Output: -1
No valid pair exists..
\`\`\`
`,
placeholder: `class Solution:
    
    def main(self, inputs):
        #your code here
    `,
test_run_code: `
s = Solution()
s.main([[0, -1, 2, -3, 1], -2])
`,
expectedOutput: '-3,1',
}
    setMarkdownSource(ex.desc);
    setExercise(ex);

    (async () => {
      await loadPyodide({
        indexURL : "https://cdn.jsdelivr.net/pyodide/v0.17.0/full/"
      });
      console.log(pyodide.runPython(`
          import sys
          print(sys.version)
      `));
    })()
      
    
    
  }, []);

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
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
    console.log("onMount: the monaco instance:", monaco)
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
    await pyodide.runPythonAsync(`
    import sys
    import io
    sys.stdout = io.StringIO()
`);
    await pyodide.runPythonAsync(editorRef.current.getValue());
    await pyodide.runPythonAsync(exercise.test_run_code);
    // let output = pyodide.runPython(editorRef.current.getValue())
    let userOutput =  pyodide.runPython("sys.stdout.getvalue()");
    setCodeResult(userOutput)
    setOutputStatus(userOutput.trim() == exercise.expectedOutput.trim())
    console.log(userOutput)
    console.log(exercise.expectedOutput)
  }

  return (
    <PageTemplate>

    <div className={classes.root}>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <Grid container spacing={6}>
          <Grid item xs={12}>
            <Remark>{markdownSource}</Remark>
          </Grid>
          </Grid>
          {/* <textarea onChange={({ currentTarget }) => setMarkdownSource(currentTarget.value)} /> */}
          
        </Grid>
        <Grid item xs={6}>
          <Editor
            height="55vh"
            defaultLanguage="python"
            defaultValue={exercise.placeholder}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            beforeMount={handleEditorWillMount}
            onValidate={handleEditorValidation}
            theme="vs-dark"
            options={{minimap:{enabled:false}}}

          />

            <CodeConsole codeResult={codeResult} outputStatus={outputStatus} />
            
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={showValue} variant="contained" color="primary">Run Code</Button>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    </div>
    </PageTemplate>
  );
}
