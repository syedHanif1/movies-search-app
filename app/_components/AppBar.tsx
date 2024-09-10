"use client";

import React from "react";
import { useRouter } from "next/navigation";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppRoutes from "../_lib/appRoutes";
import Button from "./Button";
import IconButton from "./IconButton";

interface AppDrawerProps {
  onClose: () => void;
}

const AppBar = ({ onClose }: AppDrawerProps) => {
  const router = useRouter();

  const handleNavigate = (path: string) => router.push(path);

  return (
    <MuiAppBar component="nav" sx={{ backgroundColor: "#1C8394" }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={onClose} sx={{ mr: 2, display: { sm: "none" } }} IconComponent={MenuIcon} />
        <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
          Movie Search App
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {Object.keys(AppRoutes).map((item: string, index: number) => (
            <Button variant="text" size="large" sx={{ fontSize: 18, color: "white", textTransform: "capitalize" }} label={item} key={index} onClick={() => handleNavigate(AppRoutes[item])} />
          ))}
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
