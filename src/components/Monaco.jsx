import React, { useEffect, useRef, useState } from "react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

function App() {
  const monaco = useMonaco();
  const monacoRef = useRef(null);
  const editorRef = useRef(null);
  const [functionType, setFuntionType]= useState('javascript')

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  function handleEditorChange(value, event) {
    console.log("here is the current model value:", value);
  }

  function handleEditorWillMount(monaco) {
    console.log(monaco?.languages, "monaco?.languages", monaco?.languages?.getLanguages());
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }

  const changeLang = lang => {
    monaco.editor.setModelLanguage(editorRef.current.getModel(), lang);
    console.log(`model language was changed to ${editorRef.current.getModel().getLanguageIdentifier().language}`);
}

  useEffect(() => {
    if (monaco) {
      loader
        .init()
        .then((monaco) =>
          console.log("here is the monaco instance with loader:", monaco)
        );
      console.log("here is the monaco isntance:", monaco);
    }
  }, [monaco]);

  const handleFunctionChange = ()=> {
    if(functionType === 'javascript'){
      setFuntionType('python')
      changeLang('python')
    } else {
      setFuntionType('javascript')
      changeLang('javascript')
    }

    console.log(editorRef.current?.getValue())
    
  }

  return (
    <>
      <h1>Clinto Editor </h1>
      
      <button onClick={handleFunctionChange}>Change Functions</button>
      <Editor
        height="90vh"
        defaultValue="// some comment"
        defaultLanguage={functionType}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
      />
    </>
  );
}

export default App;

