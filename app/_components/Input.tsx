import React from "react";
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";

type CustomProps = MuiTextFieldProps & {
  endAdornment: React.ReactNode;
  // add custom props here
};

const defaultInputProps: Partial<CustomProps> = {
  variant: "outlined",
  fullWidth: true,
};

const TextInput: React.FC<CustomProps> = (props) => {
  // Merge default props with custom props
  const mergedProps = { ...defaultInputProps, ...props };

  const { endAdornment, ...rest } = mergedProps;

  return (
    <MuiTextField
      {...rest}
      InputProps={{
        style: { color: "#000B0D" },
        endAdornment: endAdornment,
      }}
      InputLabelProps={{ style: { color: "#000B0D" } }}
      sx={{
        "& .MuiOutlinedInput-root": {
          height: 55,
          paddingRight: "0px",
          borderRadius: "20px",
          "& fieldset": { borderWidth: "3px", borderColor: "#1C8394" },
          "&:hover fieldset": { borderColor: "#1C8394" },
          "&.Mui-focused fieldset": { borderColor: "#1C8394" },
          "& .MuiInputAdornment-root": {
            height: "100%",
          },
        },
      }}
    />
  );
};

export default TextInput;
