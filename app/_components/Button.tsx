import React from "react";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

interface CustomProps extends MuiButtonProps {
  label: string;
}

const defaultButtonProps: Partial<CustomProps> = {
  variant: "contained",
  color: "primary",
  size: "medium",
};

const Button: React.FC<CustomProps> = (props) => {
  // Merge default props with custom props
  const mergedProps = { ...defaultButtonProps, ...props };

  const { label, ...rest } = mergedProps;

  return <MuiButton {...rest}>{label}</MuiButton>;
};

export default Button;
