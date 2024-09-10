import React from "react";
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";

type CustomProps = MuiTextFieldProps & {
  label: string;
  icon?: React.ReactNode;
};

const defaultInputProps: Partial<CustomProps> = {
  variant: "outlined",
  fullWidth: true,
  size: "medium",
};

const TextInput: React.FC<CustomProps> = (props) => {
  // Merge default props with custom props
  const mergedProps = { ...defaultInputProps, ...props };

  const { label, icon, ...rest } = mergedProps;

  return (
    <MuiTextField
      {...rest}
      InputProps={{
        style: { color: "#000B0D" },
        startAdornment: icon ? <InputAdornment position="end">{icon}</InputAdornment> : null,
      }}
      InputLabelProps={{ style: { color: "#000B0D" } }}
      style={{ borderRadius: 30 }}
    />
  );
};

export default TextInput;
