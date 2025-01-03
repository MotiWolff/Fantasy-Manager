import { Box, Button, Container, Typography } from '@mui/material';
import { yahooAuth } from '../services/api';

function Home() {
  const handleLogin = async () => {
    try {
      const { data } = await yahooAuth.getAuthUrl();
      window.location.href = data.authUrl;
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Fantasy Basketball Manager
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
          Automate your Yahoo Fantasy Basketball team management
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleLogin}
          sx={{ mt: 4 }}
        >
          Login with Yahoo
        </Button>
      </Box>
    </Container>
  );
}

export default Home; 