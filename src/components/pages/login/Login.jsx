import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Grid, Link, CssBaseline, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './login.css';

const Login = () => {
  const theme = createTheme();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(''); // Clear errors
    setLoading(true); // Show loading spinner

    // Basic validation for empty fields
    if (!formData.username || !formData.password) {
      setErrors('Please fill in all fields.');
      setLoading(false); // Stop loading
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Send credentials with the request if needed
      });

      const responseData = await response.json();
      console.log('Response Data:', responseData);  // For debugging the response

      if (response.ok) {
        // If login is successful, store the JWT token and user role
        if (responseData.token && responseData.user) {
          localStorage.setItem('token', responseData.token);
          localStorage.setItem('userRole', responseData.user.role);

          // Redirect based on user role
          if (responseData.user.role === 'user') {
            navigate('/'); // Navigate to user dashboard
          } else if (responseData.user.role === 'admin') {
            navigate('/dashboard'); // Navigate to admin dashboard
          }
        }
      } else {
        // If login fails, display the error message from the server
        setErrors(responseData.message || 'Invalid username or password.');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false); // Stop loading if an error occurs
      setErrors('Login failed. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className="login-container">
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" className="login-title">
            Sign In
          </Typography>
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
              disabled={loading} // Disable the button when loading
              className="login-button"
            >
              {loading ? <CircularProgress size={24} color="secondary" /> : 'Sign In'}
            </Button>

            {errors && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }} className="error-message">
                {errors}
              </Typography>
            )}

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
