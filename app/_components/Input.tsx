import React from "react";
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";

type CustomProps = MuiTextFieldProps & {
  label: string;
};

const defaultInputProps: Partial<CustomProps> = {
  variant: "outlined",
  fullWidth: true,
  size: "medium",
};

const TextInput: React.FC<CustomProps> = (props) => {
  // Merge default props with custom props
  const mergedProps = { ...defaultInputProps, ...props };

  const { label, ...rest } = mergedProps;

  return <MuiTextField {...rest} InputProps={{ style: { color: "#000B0D" } }} InputLabelProps={{ style: { color: "#000B0D" } }} style={{ backgroundColor: "white", borderRadius: 5 }} />;
};

export default TextInput;
