import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

export const CreatableInput: React.FC<{
  options: string[];
  label: string;
  error?: boolean;
  value: string[];
  handleChange: (value: string[]) => void;
}> = ({ options, label, handleChange, value, error = false }) => {
  return (
    <Autocomplete
      value={value}
      fullWidth
      multiple
      onChange={(e, value) => handleChange(value)}
      filterOptions={(options, params) => {
        const filtered = filter(options, params as any);
        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue === option);
        if (inputValue !== "" && !isExisting) {
          filtered.push(inputValue);
        }
        return filtered as string[];
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={options}
      getOptionLabel={(option) => {
        return option;
      }}
      renderOption={(props, option) => <li {...props}>{option}</li>}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} error={error} label={label} />
      )}
    />
  );
};
