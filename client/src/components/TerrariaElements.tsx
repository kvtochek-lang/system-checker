import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

// Компонент для отображения сундука (как в Terraria)
export const Chest: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <Box
    sx={{
      position: 'relative',
      width: 64,
      height: 48,
      backgroundColor: '#8B5E3C',
      border: '3px solid #5D3A1A',
      borderRadius: '4px',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '10px',
        left: '20px',
        width: 20,
        height: 10,
        backgroundColor: '#B8860B',
        border: '2px solid #8B6914',
        borderRadius: '2px',
      },
      '&::after': {
        content: '"🔒"',
        position: 'absolute',
        top: '5px',
        right: '5px',
        fontSize: '12px',
      },
    }}
  >
    {children}
  </Box>
);

// Компонент для отображения факела
export const Torch: React.FC = () => (
  <Box
    sx={{
      position: 'relative',
      width: 20,
      height: 60,
      '&::before': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 5,
        width: 10,
        height: 50,
        backgroundColor: '#8B5E3C',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        backgroundColor: '#FFA500',
        borderRadius: '50%',
        boxShadow: '0 0 20px #FF8C00',
        animation: 'flicker 0.5s infinite',
      },
      '@keyframes flicker': {
        '0%, 100%': { opacity: 1, transform: 'scale(1)' },
        '50%': { opacity: 0.8, transform: 'scale(0.9)' },
      },
    }}
  />
);

// Компонент для отображения сердца (жизни)
export const Heart: React.FC = () => (
  <Box
    sx={{
      color: '#FF4444',
      fontSize: '24px',
      animation: 'pulse 1s infinite',
      '@keyframes pulse': {
        '0%, 100%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.1)' },
      },
    }}
  >
    ❤️
  </Box>
);

// Компонент для отображения звезды (мана)
export const ManaStar: React.FC = () => (
  <Box
    sx={{
      color: '#4444FF',
      fontSize: '24px',
      animation: 'pulse 1.5s infinite',
    }}
  >
    ✦
  </Box>
);

// Terraria-стилизованный заголовок
export const TerrariaTitle: React.FC<{ text: string }> = ({ text }) => (
  <Typography
    variant="h3"
    sx={{
      fontFamily: '"Courier New", monospace',
      fontWeight: 'bold',
      color: '#3C2F23',
      textShadow: '4px 4px 0 #8B5E3C, 6px 6px 0 rgba(0,0,0,0.2)',
      letterSpacing: '2px',
      marginBottom: 4,
      position: 'relative',
      display: 'inline-block',
      '&::before': {
        content: '"⚔️"',
        position: 'absolute',
        left: '-40px',
        top: '0',
        fontSize: '24px',
      },
      '&::after': {
        content: '"🛡️"',
        position: 'absolute',
        right: '-40px',
        top: '0',
        fontSize: '24px',
      },
    }}
  >
    {text}
  </Typography>
);

// Terraria-стилизованная карточка
export const TerrariaCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Paper
    sx={{
      backgroundColor: 'rgba(255, 248, 231, 0.9)',
      border: '3px solid #8B5E3C',
      borderRadius: 8,
      padding: 3,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: -5,
        left: -5,
        right: -5,
        bottom: -5,
        border: '2px solid #5D3A1A',
        borderRadius: 10,
        pointerEvents: 'none',
      },
    }}
  >
    {children}
  </Paper>
);
