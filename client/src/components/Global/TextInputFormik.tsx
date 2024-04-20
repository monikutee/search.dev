import { useField } from "formik";
import React, { useEffect } from "react";
import TextField, { TextFieldVariants } from "@mui/material/TextField";

export interface TextInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  label: string;
  multiline?: boolean;
  rows?: number;
  variant?: TextFieldVariants;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  multiline = false,
  rows = undefined,
  variant = "outlined",
  ...props
}) => {
  const [field, meta, helper] = useField(props.name);

  useEffect(() => {
    if (meta.touched) {
      helper.setTouched(true, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isError = meta?.touched && !!meta?.error;

  return (
    <>
      <TextField
        fullWidth
        variant={variant}
        multiline={multiline}
        value={field.value}
        onChange={(e) => helper.setValue(e.target.value)}
        onBlur={field.onBlur}
        onInput={() => helper.setTouched(true, true)}
        error={isError}
        label={label}
        rows={rows}
        helperText={isError && meta.error}
      />
    </>
  );
};
export default TextInput;
