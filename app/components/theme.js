"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Ubuntu"
  },
  palette: {
    primary: {
      main: "#53A2BE", 
      contrastText: "#F7F0F0",
    },
    
    secondary: {
      main: "#F7F0F0",
      contrastText: "#53A2BE",
    },
  },
});

export default theme;
