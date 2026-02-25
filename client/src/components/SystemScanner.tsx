import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Alert,
  Paper,
  Grid,
  Divider,
  Chip
} from '@mui/material';
import {
  Computer,
  Memory,
  Cpu,
  Vrpano,
  CheckCircle,
  Error as ErrorIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import hardwareScanner from '../services/hardwareScanner';
import { SystemProfile } from '../types';

interface SystemScannerProps {
  onScanComplete: (profile: SystemProfile) => void;
}

const SystemScanner: React.FC<SystemScannerProps> = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<SystemProfile | null>(null);

  const handleScan = async () => {
    setIsScanning(true);
    setError(null);
    
    try {
      const systemProfile = await hardwareScanner.scanSystem();
      setProfile(systemProfile);
      onScanComplete(systemProfile);
    } catch (err) {
      setError('Ошибка при сканировании системы. Пожалуйста, попробуйте снова.');
      console.error('Scan error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Computer sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Typography variant="h5" component="h2">
            Сканер системы
          </Typography>
        </Box>

        <Typography variant="body1" color="text.secondary" paragraph>
          Нажмите кнопку ниже, чтобы автоматически определить конфигурацию вашего компьютера.
          Сервис соберет информацию о видеокарте, процессоре и оперативной памяти.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleScan}
            disabled={isScanning}
            startIcon={isScanning ? <CircularProgress size={20} color="inherit" /> : <Computer />}
            sx={{ minWidth: 200 }}
          >
            {isScanning ? 'Сканирование...' : 'Просканировать систему'}
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {profile && (
          <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircle color="success" sx={{ mr: 1 }} />
              Результаты сканирования
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Vrpano sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body2" color="text.secondary">Видеокарта:</Typography>
                </Box>
                <Typography variant="body1" sx={{ ml: 4 }}>
                  {profile.gpu.normalizedName}
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Cpu sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body2" color="text.secondary">Процессор:</Typography>
                </Box>
                <Typography variant="body1" sx={{ ml: 4 }}>
                  {profile.cpu.cores} логических ядер
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Memory sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body2" color="text.secondary">Оперативная память:</Typography>
                </Box>
                <Typography variant="body1" sx={{ ml: 4 }}>
                  ~{profile.memory.totalGB} ГБ
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Computer sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body2" color="text.secondary">Операционная система:</Typography>
                </Box>
                <Typography variant="body1" sx={{ ml: 4 }}>
                  {profile.system.os}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />
            
            <Chip 
              label="Данные собраны автоматически" 
              size="small" 
              color="success"
              variant="outlined"
            />
          </Paper>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemScanner;
