import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Grid, Link, CssBaseline, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie'; // Import js-cookie for cookie handling
import './login.css';

const theme = createTheme();

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('');
    setLoading(true);

    // Validate inputs
    if (!formData.username || !formData.password) {
      setErrors('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const responseData = await response.json();
      if (response.ok && responseData.token && responseData.user) {
        // Store token and role in cookies
        Cookies.set('token', responseData.token, { expires: 1 / 24, secure: true, sameSite: 'Strict' });
        Cookies.set('userRole', responseData.user.role, { expires: 1 / 24, secure: true, sameSite: 'Strict' });

        // Redirect based on role
        if (responseData.user.role === 'user') {
          navigate('/');
        } else if (responseData.user.role === 'admin') {
          navigate('/dashboard');
        }
      } else {
        setErrors(responseData.message || 'Invalid username or password.');
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
      <Container component="main" maxWidth="xs" className="login-container">
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" className="login-title">Sign In</Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} className="login-form" noValidate>
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
              id="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              type="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
              className="login-button"
            >
              {loading ? <CircularProgress size={24} color="secondary" /> : 'Sign In'}
            </Button>
            {errors && <Typography variant="body2" color="error" sx={{ mt: 1 }} className="error-message">{errors}</Typography>}
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
