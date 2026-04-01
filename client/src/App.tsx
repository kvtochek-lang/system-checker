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
  Alert,
  ThemeProvider
} from '@mui/material';
import SystemScanner from './components/SystemScanner';
import SoftwareSearch from './components/SoftwareSearch';
import CompatibilityResult from './components/CompatibilityResult';
import { checkCompatibility } from './services/api';
import { SystemProfile, CompatibilityResult as ResultType } from './types';
import terrariaTheme from './theme';
import TerrariaBackground from './components/TerrariaBackground';
import { TerrariaTitle, Heart, ManaStar, Torch } from './components/TerrariaElements';

const steps = ['Сканирование системы', 'Выбор программы', 'Результат'];

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [systemProfile, setSystemProfile] = useState<SystemProfile | null>(null);
  const setSelectedSoftware = (softwareId: string | null) => {
    console.log('Selected software:', softwareId);
  };
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
    <ThemeProvider theme={terrariaTheme}>
      <TerrariaBackground>
        <AppBar position="static" elevation={0} sx={{ 
          background: 'transparent',
          borderBottom: '4px solid #3E543E',
          boxShadow: 'none',
          backdropFilter: 'blur(4px)',
        }}>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
              <Box sx={{ fontSize: '32px' }}>⚔️</Box>
              <Typography variant="h5" component="div" sx={{ 
                fontFamily: '"Courier New", monospace',
                fontWeight: 'bold',
                color: '#3C2F23',
                textShadow: '2px 2px 0 #8B5E3C',
              }}>
                System Checker
              </Typography>
              <Box sx={{ fontSize: '24px', ml: 1 }}>🛡️</Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Heart />
              <ManaStar />
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, position: 'relative' }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <TerrariaTitle text="Проверка совместимости" />
          </Box>
          
          <Paper sx={{ 
            p: 3, 
            mb: 4, 
            backgroundColor: 'rgba(255, 248, 231, 0.9)',
            border: '3px solid #8B5E3C',
            borderRadius: 8,
          }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontFamily: '"Courier New", monospace' }}>
                      {index === 0 && '🗺️'}
                      {index === 1 && '⚔️'}
                      {index === 2 && '🏆'}
                      {label}
                    </Box>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>

          {error && (
            <Alert severity="error" sx={{ mb: 3, fontFamily: '"Courier New", monospace' }}>
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
                  <Paper sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(255, 248, 231, 0.95)',
                    border: '3px solid #8B5E3C',
                    borderRadius: 8,
                  }}>
                    <Typography variant="h6" gutterBottom sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      fontFamily: '"Courier New", monospace',
                      fontWeight: 'bold',
                    }}>
                      <Box component="span" sx={{ mr: 1, fontSize: '24px' }}>📦</Box>
                      Ваша система
                    </Typography>
                    {systemProfile && (
                      <Box>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, fontFamily: '"Courier New", monospace' }}>
                          <span>🎮</span> <strong>GPU:</strong> {systemProfile.gpu.normalizedName}
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, fontFamily: '"Courier New", monospace' }}>
                          <span>⚙️</span> <strong>CPU:</strong> {systemProfile.cpu.cores} ядер
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, fontFamily: '"Courier New", monospace' }}>
                          <span>💾</span> <strong>RAM:</strong> {systemProfile.memory.totalGB} ГБ
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, fontFamily: '"Courier New", monospace' }}>
                          <span>🪟</span> <strong>ОС:</strong> {systemProfile.system.os}
                        </Typography>
                      </Box>
                    )}
                    <Button 
                      variant="outlined" 
                      fullWidth 
                      sx={{ mt: 2, fontFamily: '"Courier New", monospace' }}
                      onClick={() => setActiveStep(0)}
                      startIcon={<span>🔄</span>}
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
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
                  <Button 
                    variant="contained" 
                    onClick={handleReset}
                    startIcon={<span>🏁</span>}
                    sx={{ fontFamily: '"Courier New", monospace' }}
                  >
                    Новая проверка
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>

        <Box component="footer" sx={{ 
          mt: 'auto',
          py: 2,
          borderTop: '2px solid #8B5E3C',
          backgroundColor: 'rgba(61, 58, 49, 0.9)',
        }}>
          <Container maxWidth="lg">
            <Typography variant="body2" align="center" sx={{ 
              color: '#F0E6D2',
              fontFamily: '"Courier New", monospace',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}>
              <span>©</span> 2026 System Checker 
              <Box component="span" sx={{ mx: 1 }}>•</Box>
              <span>⚔️</span> Все проверки безопасны 
              <Box component="span" sx={{ mx: 1 }}>•</Box>
              <span>🛡️</span> Без установки ПО
              <Box sx={{ position: 'relative', display: 'inline-block', ml: 2 }}>
                <Torch />
              </Box>
            </Typography>
          </Container>
        </Box>
      </TerrariaBackground>
    </ThemeProvider>
  );
}

export default App;
