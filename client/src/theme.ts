import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: "DM sans",
  },
  palette: {
    primary: {
      main: "#486284",
    },
    secondary: {
      main: "#EFF2F6",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
