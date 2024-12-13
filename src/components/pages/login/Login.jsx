import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography, CssBaseline, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';

const theme = createTheme();

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!formData.username || !formData.password) {
      setErrors('Both fields are required.');
      return;
    }

    // Set loading state
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok && responseData.token && responseData.user && responseData.user.role) {
        // Save the token and user role in localStorage
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('userRole', responseData.user.role);

        // Set success message and reset errors
        setSuccessMessage('Login successful!');
        setErrors('');
        
        // Redirect based on user role
        if (responseData.user.role === 'user') {
          navigate('/home'); 
        } else if (responseData.user.role === 'admin') {
          navigate('/dashboard');
        }
      } else {
        setErrors('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">Sign in</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Sign In'}
            </Button>
            {errors && <Typography variant="body2" color="error" sx={{ mt: 1 }}>{errors}</Typography>}
            {successMessage && <Typography variant="body2" color="success" sx={{ mt: 1 }}>{successMessage}</Typography>}
            <Grid container>
              <Grid item>
                <Link style={{ cursor: 'pointer' }} onClick={() => navigate('/signup')} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
