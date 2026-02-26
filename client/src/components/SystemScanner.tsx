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
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Computer,
  Memory as MemoryIcon,
  DeveloperBoard as CpuIcon,
  VideogameAsset as GpuIcon,
  CheckCircle,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Edit
} from '@mui/icons-material';
import hardwareScanner from '../services/hardwareScanner';
import { SystemProfile } from '../types';
import { Coin } from './MarioElements';

interface SystemScannerProps {
  onScanComplete: (profile: SystemProfile) => void;
}

const SystemScanner: React.FC<SystemScannerProps> = ({ onScanComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<SystemProfile | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMemory, setEditMemory] = useState(16);

  const handleScan = async () => {
    setIsScanning(true);
    setError(null);
    
    try {
      const systemProfile = await hardwareScanner.scanSystem();
      console.log('📊 Сканирование завершено:', systemProfile);
      
      // Если память определилась как 8 ГБ, но у пользователя RTX 3060, предлагаем исправить
      if (systemProfile.memory.totalGB === 8 && 
          systemProfile.gpu.normalizedName.includes('RTX 3060')) {
        setEditMemory(16);
        setOpenDialog(true);
      }
      
      setProfile(systemProfile);
      onScanComplete(systemProfile);
    } catch (err) {
      setError('Ошибка при сканировании системы. Пожалуйста, попробуйте снова.');
      console.error('Scan error:', err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleMemoryEdit = () => {
    if (profile) {
      const updatedProfile = {
        ...profile,
        memory: {
          ...profile.memory,
          totalGB: editMemory
        }
      };
      setProfile(updatedProfile);
      onScanComplete(updatedProfile);
      setOpenDialog(false);
    }
  };

  return (
    <>
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
              startIcon={isScanning ? <CircularProgress size={20} /> : <span>🎮</span>}
              sx={{ minWidth: 200 }}
            >
              {isScanning ? 'Сканирование...' : 'ПРОСКАНИРОВАТЬ СИСТЕМУ'}
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {profile && (
            <Paper variant="outlined" sx={{ mt: 3, p: 2, position: 'relative' }}>
              <Box sx={{ position: 'absolute', top: -10, right: -10 }}>
                <Coin />
              </Box>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '24px', marginRight: '8px' }}>🏆</span>
                Результаты сканирования
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <GpuIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2" color="text.secondary">Видеокарта:</Typography>
                  </Box>
                  <Typography variant="body1" sx={{ ml: 4 }}>
                    {profile.gpu.normalizedName}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CpuIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2" color="text.secondary">Процессор:</Typography>
                  </Box>
                  <Typography variant="body1" sx={{ ml: 4 }}>
                    {profile.cpu.cores} логических ядер
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <MemoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2" color="text.secondary">Оперативная память:</Typography>
                    <Button 
                      size="small" 
                      startIcon={<Edit />} 
                      onClick={() => {
                        setEditMemory(profile.memory.totalGB);
                        setOpenDialog(true);
                      }}
                      sx={{ ml: 1 }}
                    >
                      Исправить
                    </Button>
                  </Box>
                  <Typography variant="body1" sx={{ ml: 4 }}>
                    {profile.memory.totalGB} ГБ
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

      {/* Диалог для ручного ввода памяти */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Уточните объем оперативной памяти</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Автоматическое определение может быть неточным. Укажите фактический объем RAM вашего компьютера.
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Объем RAM</InputLabel>
            <Select
              value={editMemory}
              label="Объем RAM"
              onChange={(e) => setEditMemory(Number(e.target.value))}
            >
              <MenuItem value={4}>4 ГБ</MenuItem>
              <MenuItem value={8}>8 ГБ</MenuItem>
              <MenuItem value={12}>12 ГБ</MenuItem>
              <MenuItem value={16}>16 ГБ</MenuItem>
              <MenuItem value={32}>32 ГБ</MenuItem>
              <MenuItem value={64}>64 ГБ</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Подсказка:</strong> Чтобы узнать точный объем RAM в Windows:
            </Typography>
            <Typography variant="body2" component="div" sx={{ bgcolor: '#f5f5f5', p: 1, mt: 1, borderRadius: 1 }}>
              1. Нажмите Ctrl + Shift + Esc<br />
              2. Перейдите на вкладку "Производительность"<br />
              3. Выберите "Память" - там будет указан точный объем
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Отмена</Button>
          <Button onClick={handleMemoryEdit} variant="contained">Сохранить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SystemScanner;
