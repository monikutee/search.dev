import React from "react";
import Editor from "@monaco-editor/react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const PythonEditor: React.FC<{
  value?: string;
  readonly?: boolean;
  onChange?: (value: string) => void;
  handleRun?: () => void;
}> = ({ value, readonly = false, onChange, handleRun }) => {
  function handleEditorChange(nValue: string | undefined) {
    if (onChange) {
      onChange(nValue ?? "");
    }
  }

  if (readonly || !handleRun || !onChange) {
    return (
      <div className="editor">
        <Typography variant="body1" color={"primary"}>
          Output
        </Typography>
        <Editor
          height="200px"
          defaultLanguage="python"
          value={value}
          options={{ readOnly: true }}
        />
      </div>
    );
  }

  return (
    <div className="editor">
      <Typography variant="body1" color={"primary"}>
        Python
      </Typography>
      <div className="editor-run">
        <Button variant="contained" onClick={() => handleRun()}>
          Run
        </Button>
      </div>
      <Editor
        height="200px"
        onChange={handleEditorChange}
        defaultLanguage="python"
        value={value}
      />
    </div>
  );
};
