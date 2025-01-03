import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Switch,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { yahooAuth } from '../services/api';

function Dashboard() {
  const [team, setTeam] = useState(null);
  const [settings, setSettings] = useState({
    autoUpdate: true,
    notifications: true,
  });

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const teamKey = localStorage.getItem('teamKey');
        if (teamKey) {
          const { data } = await yahooAuth.getTeam(teamKey);
          setTeam(data);
        }
      } catch (error) {
        console.error('Error fetching team:', error);
      }
    };

    fetchTeam();
  }, []);

  const handleSettingChange = (setting) => (event) => {
    setSettings(prev => ({
      ...prev,
      [setting]: event.target.checked
    }));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Team Dashboard
        </Typography>
        
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Settings
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.autoUpdate}
                    onChange={handleSettingChange('autoUpdate')}
                  />
                }
                label="Auto-update lineup"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications}
                    onChange={handleSettingChange('notifications')}
                  />
                }
                label="Enable notifications"
              />
            </FormGroup>
          </CardContent>
        </Card>

        {team && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Team Roster
              </Typography>
              {/* Add roster display logic here */}
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
}

export default Dashboard; 