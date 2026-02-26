import React from 'react';
import { Box, Typography } from '@mui/material';

// Компонент для отображения вопросительного блока
export const QuestionBlock: React.FC<{ text?: string }> = ({ text }) => (
  <Box
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FBD743',
      color: '#B45F06',
      width: 40,
      height: 40,
      borderRadius: '8px',
      fontSize: '24px',
      fontWeight: 'bold',
      boxShadow: '0 4px 0 #B45F06',
      margin: '0 4px',
      transform: 'translateY(-2px)',
      '&:hover': {
        transform: 'translateY(0)',
        boxShadow: '0 2px 0 #B45F06',
      },
    }}
  >
    {text || '?'}
  </Box>
);

// Компонент для отображения монетки
export const Coin: React.FC = () => (
  <Box
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFD700',
      width: 30,
      height: 30,
      borderRadius: '50%',
      fontSize: '18px',
      color: '#B8860B',
      boxShadow: '0 4px 0 #B8860B',
      animation: 'bounce 1s infinite',
      '@keyframes bounce': {
        '0%, 100%': {
          transform: 'translateY(0)',
        },
        '50%': {
          transform: 'translateY(-5px)',
        },
      },
    }}
  >
    ⭕
  </Box>
);

// Компонент для отображения облачка (как в Mario)
export const Cloud: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <Box
    sx={{
      backgroundColor: '#FFFFFF',
      borderRadius: '50px',
      padding: '12px 24px',
      position: 'relative',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      display: 'inline-block',
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        borderRadius: '50%',
      },
      '&::before': {
        top: '-20px',
        left: '10px',
        width: '40px',
        height: '40px',
      },
      '&::after': {
        top: '-15px',
        right: '10px',
        width: '30px',
        height: '30px',
      },
    }}
  >
    {children}
  </Box>
);

// Компонент для отображения трубы (зеленый блок)
export const Pipe: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <Box
    sx={{
      backgroundColor: '#2E7D32',
      borderRadius: '12px 12px 0 0',
      padding: '16px',
      position: 'relative',
      border: '4px solid #1B5E20',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '-10px',
        left: '20%',
        width: '60%',
        height: '20px',
        backgroundColor: '#4CAF50',
        borderRadius: '10px 10px 0 0',
      },
    }}
  >
    {children}
  </Box>
);

// Компонент для отображения звезды
export const Star: React.FC = () => (
  <Box
    sx={{
      color: '#FFD700',
      fontSize: '24px',
      animation: 'spin 3s linear infinite',
      display: 'inline-block',
      '@keyframes spin': {
        '0%': {
          transform: 'rotate(0deg)',
        },
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
    }}
  >
    ⭐
  </Box>
);

// Заголовок с Mario-стилем
export const MarioTitle: React.FC<{ text: string }> = ({ text }) => (
  <Typography
    variant="h4"
    sx={{
      color: '#E52525',
      textShadow: '3px 3px 0 #1E88E5, 5px 5px 0 rgba(0,0,0,0.2)',
      fontWeight: 800,
      letterSpacing: '2px',
      marginBottom: 3,
      position: 'relative',
      display: 'inline-block',
      '&::before': {
        content: '"⭐"',
        position: 'absolute',
        left: '-30px',
        top: '0',
        fontSize: '24px',
        animation: 'spin 3s linear infinite',
      },
      '&::after': {
        content: '"⭐"',
        position: 'absolute',
        right: '-30px',
        top: '0',
        fontSize: '24px',
        animation: 'spin 3s linear infinite',
      },
    }}
  >
    {text}
  </Typography>
);
