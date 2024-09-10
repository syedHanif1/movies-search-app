import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { AppBar as MuiAppBar, Box, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import AppRoutes from "../_lib/appRoutes";
import Button from "./Button";
import IconButton from "./IconButton";

interface AppDrawerProps {
  onClose: () => void;
}

const AppBar = ({ onClose }: AppDrawerProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (path: string) => router.push(path);

  return (
    <MuiAppBar component="nav" sx={{ backgroundColor: "#1C8394" }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={onClose} sx={{ mr: 2, display: { sm: "none" } }} IconComponent={MenuIcon} />
        <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
          SeekMovie
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {Object.keys(AppRoutes).map((item: string, index: number) => (
            <Button
              variant="text"
              size="large"
              sx={{
                fontSize: 16,
                color: pathname === AppRoutes[item] ? "#F0F0F0" : "#B0B0B0",
                fontWeight: pathname === AppRoutes[item] ? "600" : "400",
                background: pathname === AppRoutes[item] ? "#f9f9f9" : "none",
                transition: "background 0.3s ease, color 0.3s ease",
                "&:hover": { color: "#FFFFFF" },
              }}
              label={item}
              key={index}
              onClick={() => handleNavigate(AppRoutes[item])}
            />
          ))}
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
