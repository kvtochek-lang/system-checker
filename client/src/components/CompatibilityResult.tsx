import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Paper,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import {
  CheckCircle,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Computer,
  Memory as MemoryIcon,
  DeveloperBoard as CpuIcon,
  VideogameAsset as GpuIcon,
  Build,
  KeyboardArrowDown,
  Save as SaveIcon,
  ShoppingCart
} from '@mui/icons-material';
import { CompatibilityResult as ResultType } from '../types';

interface CompatibilityResultProps {
  result: ResultType;
}

const CompatibilityResult: React.FC<CompatibilityResultProps> = ({ result }) => {
  // Ссылка на элемент отчета для скриншота
  const reportRef = useRef<HTMLDivElement>(null);
  
  // Состояния
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [savingImage, setSavingImage] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [savedImageUrl, setSavedImageUrl] = useState('');
  const open = Boolean(anchorEl);

  // Определяем, нужна ли кнопка апгрейда (только если система НЕ полностью совместима)
  const showUpgradeButton = result.overallStatus !== 'compatible';

  // ========== Функция сохранения отчета как картинки ==========
  const saveReportAsImage = async () => {
    if (!reportRef.current) {
      alert('Не удалось захватить отчет');
      return;
    }

    setSavingImage(true);
    
    try {
      // Временно скрываем кнопки
      const buttons = document.querySelectorAll('.no-screenshot');
      buttons.forEach(btn => {
        (btn as HTMLElement).style.opacity = '0';
        (btn as HTMLElement).style.visibility = 'hidden';
      });
      
      // Делаем скриншот
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true
      });
      
      // Возвращаем кнопки обратно
      buttons.forEach(btn => {
        (btn as HTMLElement).style.opacity = '1';
        (btn as HTMLElement).style.visibility = 'visible';
      });
      
      // Создаем ссылку для скачивания
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      const fileName = `compatibility_report_${result.softwareName}_${new Date().toISOString().slice(0,19).replace(/:/g, '-')}.png`;
      link.download = fileName;
      link.href = image;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Показываем диалог успеха
      setSavedImageUrl(image);
      setShowSuccessDialog(true);
      
    } catch (error) {
      console.error('Ошибка при сохранении изображения:', error);
      alert('Не удалось сохранить отчет как изображение');
    } finally {
      setSavingImage(false);
    }
  };

  // ========== Функция открытия меню выбора магазина ==========
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // ========== Функция закрытия меню и открытия магазина ==========
  const handleMarketplaceSelect = (market: string) => {
    setAnchorEl(null);
    
    // Находим информацию о GPU
    const gpuCheck = result.checks.find(c => c.component === 'GPU');
    if (!gpuCheck) {
      alert('Не удалось определить рекомендуемую видеокарту');
      return;
    }
    
    // Извлекаем название видеокарты
    let searchQuery = gpuCheck.requiredValue
      .replace(/видеокарта уровня/gi, '')
      .replace(/Видеокарта уровня/gi, '')
      .replace(/NVIDIA/gi, '')
      .replace(/AMD/gi, '')
      .trim();
    
    // Формируем URL
    let url = '';
    switch(market) {
      case 'yandex':
        url = `https://market.yandex.ru/search?text=${encodeURIComponent(searchQuery + ' видеокарта')}&cv=2`;
        break;
      case 'dns':
        url = `https://www.dns.ru/catalog/videokarty/?q=${encodeURIComponent(searchQuery)}`;
        break;
      case 'citilink':
        url = `https://www.citilink.ru/catalog/videokarty/?text=${encodeURIComponent(searchQuery)}`;
        break;
      case 'ozon':
        url = `https://www.ozon.ru/search/?text=${encodeURIComponent(searchQuery + ' видеокарта')}`;
        break;
      case 'wildberries':
        url = `https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURIComponent(searchQuery)}`;
        break;
      default:
        return;
    }
    
    window.open(url, '_blank');
  };

  // ========== Функции для отображения иконок ==========
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle color="success" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'fail':
        return <ErrorIcon color="error" />;
      default:
        return null;
    }
  };

  const getComponentIcon = (component: string) => {
    switch (component.toLowerCase()) {
      case 'gpu':
        return <GpuIcon />;
      case 'cpu':
        return <CpuIcon />;
      case 'ram':
        return <MemoryIcon />;
      case 'os':
        return <Computer />;
      default:
        return <Build />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'fail':
        return 'error';
      default:
        return 'default';
    }
  };

  const getOverallStatusInfo = () => {
    switch (result.overallStatus) {
      case 'compatible':
        return {
          title: 'Система полностью совместима!',
          color: 'success' as const,
          icon: <CheckCircle sx={{ fontSize: 40 }} />,
          description: 'Ваш компьютер соответствует рекомендуемым требованиям.'
        };
      case 'partial':
        return {
          title: 'Частичная совместимость',
          color: 'warning' as const,
          icon: <WarningIcon sx={{ fontSize: 40 }} />,
          description: 'Система соответствует минимальным требованиям, но могут быть ограничения.'
        };
      case 'incompatible':
        return {
          title: 'Система не совместима',
          color: 'error' as const,
          icon: <ErrorIcon sx={{ fontSize: 40 }} />,
          description: 'Ваш компьютер не соответствует минимальным требованиям.'
        };
      default:
        return {
          title: 'Результат проверки',
          color: 'info' as const,
          icon: <Computer sx={{ fontSize: 40 }} />,
          description: 'Проверка выполнена'
        };
    }
  };

  const statusInfo = getOverallStatusInfo();

  return (
    <>
      <Card elevation={3}>
        <CardContent>
          {/* Основной отчет - для скриншота */}
          <div ref={reportRef}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              {statusInfo.icon}
              <Typography variant="h5" sx={{ ml: 2 }}>
                {result.softwareName}
              </Typography>
            </Box>

            <Alert severity={statusInfo.color} sx={{ mb: 3 }}>
              <AlertTitle>{statusInfo.title}</AlertTitle>
              {statusInfo.description}
            </Alert>

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Детальная проверка компонентов
            </Typography>

            <List>
              {result.checks.map((check, index) => (
                <React.Fragment key={check.component}>
                  <ListItem>
                    <ListItemIcon>
                      {getComponentIcon(check.component)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1">
                            {check.component}
                          </Typography>
                          <Chip
                            size="small"
                            label={check.status === 'success' ? 'OK' : check.status === 'warning' ? 'Внимание' : 'Ошибка'}
                            color={getStatusColor(check.status)}
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="text.primary" component="div" display="block">
                            Ваше значение: {check.userValue}
                          </Typography>
                          <Typography variant="body2" color="text.primary" component="div" display="block">
                            Требуется: {check.requiredValue}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" component="div" sx={{ mt: 1 }}>
                            {check.message}
                          </Typography>
                        </>
                      }
                    />
                    <ListItemIcon>
                      {getStatusIcon(check.status)}
                    </ListItemIcon>
                  </ListItem>
                  {index < result.checks.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>

            {result.recommendations.length > 0 && (
              <>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Рекомендации
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {result.recommendations.map((rec, index) => (
                    <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle1" color={rec.type === 'critical' ? 'error.main' : 'primary'}>
                        {rec.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {rec.description}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </>
            )}
          </div>

          {/* Кнопки действий */}
          <Box sx={{ display: 'flex', gap: 2, mt: 4, pt: 2, borderTop: '1px solid #e0e0e0', justifyContent: 'center' }} className="no-screenshot">
            {/* Кнопка сохранения результата */}
            <Button
              variant="contained"
              color="primary"
              startIcon={savingImage ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              onClick={saveReportAsImage}
              disabled={savingImage}
            >
              {savingImage ? 'Сохранение...' : 'Сохранить результат'}
            </Button>

            {/* Кнопка апгрейда - показывается только если система НЕ полностью совместима */}
            {showUpgradeButton && (
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<ShoppingCart />}
                endIcon={<KeyboardArrowDown />}
                onClick={handleOpenMenu}
              >
                Посмотреть варианты апгрейда
              </Button>
            )}
          </Box>

          {/* Меню выбора маркетплейса */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => handleMarketplaceSelect('yandex')}>
              🟡 Яндекс Маркет
            </MenuItem>
            <MenuItem onClick={() => handleMarketplaceSelect('dns')}>
              🔵 DNS
            </MenuItem>
            <MenuItem onClick={() => handleMarketplaceSelect('citilink')}>
              🟢 Citilink
            </MenuItem>
            <MenuItem onClick={() => handleMarketplaceSelect('ozon')}>
              🔴 OZON
            </MenuItem>
            <MenuItem onClick={() => handleMarketplaceSelect('wildberries')}>
              🟣 Wildberries
            </MenuItem>
          </Menu>
        </CardContent>
      </Card>

      {/* Диалог успешного сохранения */}
      <Dialog open={showSuccessDialog} onClose={() => setShowSuccessDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>✅ Отчет сохранен!</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Отчет сохранен в папке "Загрузки" вашего компьютера.
          </Typography>
          {savedImageUrl && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <img 
                src={savedImageUrl} 
                alt="Preview" 
                style={{ maxWidth: '100%', maxHeight: '300px', border: '1px solid #ccc', borderRadius: '8px' }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSuccessDialog(false)} variant="contained">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CompatibilityResult;
