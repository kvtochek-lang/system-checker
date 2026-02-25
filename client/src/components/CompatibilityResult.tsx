import React from 'react';
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
  Paper
} from '@mui/material';
import {
  CheckCircle,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Computer,
  Memory,
  Cpu,
  Vrpano,
  Build,
  Download
} from '@mui/icons-material';
import { CompatibilityResult as ResultType } from '../types';

interface CompatibilityResultProps {
  result: ResultType;
}

const CompatibilityResult: React.FC<CompatibilityResultProps> = ({ result }) => {
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
        return <Vrpano />;
      case 'cpu':
        return <Cpu />;
      case 'ram':
        return <Memory />;
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
          color: 'success',
          icon: <CheckCircle sx={{ fontSize: 40 }} />,
          description: 'Ваш компьютер соответствует рекомендуемым требованиям.'
        };
      case 'partial':
        return {
          title: 'Частичная совместимость',
          color: 'warning',
          icon: <WarningIcon sx={{ fontSize: 40 }} />,
          description: 'Система соответствует минимальным требованиям, но могут быть ограничения.'
        };
      case 'incompatible':
        return {
          title: 'Система не совместима',
          color: 'error',
          icon: <ErrorIcon sx={{ fontSize: 40 }} />,
          description: 'Ваш компьютер не соответствует минимальным требованиям.'
        };
    }
  };

  const statusInfo = getOverallStatusInfo();

  return (
    <Card elevation={3}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          {statusInfo?.icon}
          <Typography variant="h5" sx={{ ml: 2 }}>
            {result.softwareName}
          </Typography>
        </Box>

        <Alert severity={statusInfo?.color as any} sx={{ mb: 3 }}>
          <AlertTitle>{statusInfo?.title}</AlertTitle>
          {statusInfo?.description}
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
                      <Typography variant="body2" color="text.primary">
                        Ваше значение: {check.userValue}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        Требуется: {check.requiredValue}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
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
                  {rec.action && (
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ mt: 1 }}
                      startIcon={<Download />}
                    >
                      {rec.action}
                    </Button>
                  )}
                </Paper>
              ))}
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CompatibilityResult;
