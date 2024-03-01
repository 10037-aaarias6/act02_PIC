// src/App.jsx
import './index.css';

import './App.css';
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  AppBar,
  Toolbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import RepoList from "./components/RepoList";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const [username, setUsername] = useState("");
  const [showRepoList, setShowRepoList] = useState(false);
  const [filter, setFilter] = useState("stars");

  const theme = createTheme({
    palette: {
      mode: 'light',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            transition: '0.3s',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            transition: '0.3s',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          },
        },
      },
    },
  });

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowRepoList(true);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mi Explorador de Repositorios
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ marginTop: "20px" }}>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Nombre de Usuario"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            sx={{ marginBottom: "10px" }}
          />
          <FormControl fullWidth sx={{ marginBottom: "10px" }}>
            <InputLabel id="filter-select-label">Filtrar por</InputLabel>
            <Select
              labelId="filter-select-label"
              id="filter-select"
              value={filter}
              label="Filtrar por"
              onChange={handleFilterChange}
            >
              <MenuItem value="stars">Estrellas</MenuItem>
              <MenuItem value="created">Fecha de Creación</MenuItem>
              <MenuItem value="language">Idioma</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" fullWidth>
            Buscar Repositorios
          </Button>
        </form>
        {showRepoList && <RepoList username={username} filter={filter} />}
      </Container>
    </ThemeProvider>
  );
}

export default App;
