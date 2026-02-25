import React, { useState } from 'react';
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Alert
} from '@mui/material';
import { Security, Speed, Devices } from '@mui/icons-material';
import SystemScanner from './components/SystemScanner';
import SoftwareSearch from './components/SoftwareSearch';
import CompatibilityResult from './components/CompatibilityResult';
import { checkCompatibility } from './services/api';
import { SystemProfile, CompatibilityResult as ResultType } from './types';

const steps = ['Сканирование системы', 'Выбор программы', 'Результат'];

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [systemProfile, setSystemProfile] = useState<SystemProfile | null>(null);
  const [selectedSoftware, setSelectedSoftware] = useState<string | null>(null);
  const [result, setResult] = useState<ResultType | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScanComplete = (profile: SystemProfile) => {
    setSystemProfile(profile);
    setActiveStep(1);
  };

  const handleSoftwareSelect = async (softwareId: string) => {
    setSelectedSoftware(softwareId);
    setError(null);
    
    if (!systemProfile) {
      setError('Сначала выполните сканирование системы');
      return;
    }

    setIsChecking(true);
    try {
      const compatibilityResult = await checkCompatibility(systemProfile, softwareId);
      setResult(compatibilityResult);
      setActiveStep(2);
    } catch (err) {
      setError('Ошибка при проверке совместимости. Пожалуйста, попробуйте снова.');
      console.error('Check error:', err);
    } finally {
      setIsChecking(false);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setSystemProfile(null);
    setSelectedSoftware(null);
    setResult(null);
    setError(null);
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static" elevation={3}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Security sx={{ mr: 2 }} />
            System Checker
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Автоматическая проверка совместимости
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {activeStep === 0 && (
            <Grid item xs={12}>
              <SystemScanner onScanComplete={handleScanComplete} />
            </Grid>
          )}

          {activeStep === 1 && (
            <>
              <Grid item xs={12} md={8}>
                <SoftwareSearch 
                  onSelect={handleSoftwareSelect} 
                  isLoading={isChecking}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Ваша система
                  </Typography>
                  {systemProfile && (
                    <Box>
                      <Typography variant="body2">
                        <strong>GPU:</strong> {systemProfile.gpu.normalizedName}
                      </Typography>
                      <Typography variant="body2">
                        <strong>CPU:</strong> {systemProfile.cpu.cores} ядер
                      </Typography>
                      <Typography variant="body2">
                        <strong>RAM:</strong> ~{systemProfile.memory.totalGB} ГБ
                      </Typography>
                      <Typography variant="body2">
                        <strong>ОС:</strong> {systemProfile.system.os}
                      </Typography>
                    </Box>
                  )}
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    sx={{ mt: 2 }}
                    onClick={() => setActiveStep(0)}
                  >
                    Вернуться к сканированию
                  </Button>
                </Paper>
              </Grid>
            </>
          )}

          {activeStep === 2 && result && (
            <Grid item xs={12}>
              <CompatibilityResult result={result} />
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button variant="contained" onClick={handleReset}>
                  Новая проверка
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>

      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 3, mt: 'auto' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2025 System Checker. Все проверки проводятся безопасно, без установки дополнительного ПО.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
