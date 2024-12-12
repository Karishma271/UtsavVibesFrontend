import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Grid, Link, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Login = () => {
  const theme = createTheme();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.username && formData.password) {
      try {
        const response = await fetch('https://utsavvibesbackend.onrender.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 200) {
          const responseData = await response.json();
          console.log('Response Data:', responseData); // Log the response

          if (responseData.token && responseData.user && responseData.user.role) {
            // Save the token and role to localStorage
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('userRole', responseData.user.role);

            // Clear any error messages
            setErrors('');

            // Redirect based on the user's role
            if (responseData.user.role === 'user') {
              navigate('/'); // Redirect to user dashboard
            } else if (responseData.user.role === 'admin') {
              navigate('/dashboard'); // Redirect to admin dashboard
            }

            // Set success message
            setSuccessMessage('Login successful!');
          } else {
            setErrors('Invalid username or password.');
          }
        } else {
          setErrors('Invalid username or password.');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrors('Login failed. Please try again.');
      }
    } else {
      setErrors('Please fill in all fields.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">Sign in</Typography>
          <Box noValidate sx={{ mt: 1 }}>
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
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {errors && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {errors}
              </Typography>
            )}
            {successMessage && (
              <Typography variant="body2" color="success" sx={{ mt: 1 }}>
                {successMessage}
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
