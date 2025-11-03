import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const MonacoEditor = ({ code = '', language = 'javascript', onChange, readOnly = false }) => {
  const [editorCode, setEditorCode] = useState(code);
  const editorRef = useRef(null);

  useEffect(() => {
    setEditorCode(code);
  }, [code]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    // Add custom theme
    monaco.editor.defineTheme('codehub-theme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e2e',
        'editor.lineHighlightBackground': '#2a2a3a',
        'editorLineNumber.foreground': '#6c7086',
      },
    });
    monaco.editor.setTheme('codehub-theme');
  };

  const handleChange = (value) => {
    setEditorCode(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        defaultLanguage={language}
        value={editorCode}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          readOnly: readOnly,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 10 },
          fontFamily: 'Fira Code, monospace',
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
          },
        }}
      />
    </div>
  );
};

export default MonacoEditor;
