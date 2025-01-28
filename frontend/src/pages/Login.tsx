import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAppTheme } from '../contexts/ThemeContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const { theme, isDarkMode } = useAppTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      // Erro já é tratado no AuthContext
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.palette.background.default,
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <Container 
        maxWidth="xs" 
        sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={isDarkMode ? 2 : 1}
          sx={{
            width: '100%',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: isDarkMode 
              ? '0 0 10px rgba(255, 255, 255, 0.1)'
              : '0 0 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box
            component="img"
            src="/logo.svg"
            alt="PCM Logo"
            sx={{
              width: 100,
              height: 'auto',
              mb: 3,
              filter: isDarkMode ? 'brightness(1)' : 'none',
            }}
          />
          <Typography 
            component="h1" 
            variant="h5" 
            sx={{ 
              mb: 3,
              fontWeight: 500,
              color: theme.palette.primary.main,
            }}
          >
            Sistema PCM
          </Typography>
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ 
              width: '100%',
            }}
          >
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 2,
                  bgcolor: isDarkMode ? 'error.dark' : 'error.light',
                }}
              >
                {error}
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2,
                py: 1.5,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
            >
              Entrar
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
