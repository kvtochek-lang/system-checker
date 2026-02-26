import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

interface BackgroundProps {
  children: React.ReactNode;
}

interface TimeColors {
  skyTop: string;
  skyBottom: string;
  horizon: string;
  sun?: string;
  sunGlow?: string;
  moon?: string;
  moonGlow?: string;
  cloudColor: string;
  cloudGlow: string;
}

const TerrariaBackground: React.FC<BackgroundProps> = ({ children }) => {
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night' | 'dusk' | 'dawn'>('day');
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; twinkleSpeed: number }>>([]);
  const [cloudPositions, setCloudPositions] = useState<Array<{ x: number; y: number; speed: number }>>([]);

  // Инициализация звезд и облаков
  useEffect(() => {
    // Генерация звезд
    const newStars = [];
    for (let i = 0; i < 150; i++) {
      newStars.push({
        x: Math.random() * 100,
        y: Math.random() * 70,
        size: Math.random() * 3 + 1,
        twinkleSpeed: Math.random() * 3 + 1,
      });
    }
    setStars(newStars);

    // Генерация облаков
    const newClouds = [];
    for (let i = 0; i < 15; i++) {
      newClouds.push({
        x: Math.random() * 100,
        y: Math.random() * 30 + 5,
        speed: Math.random() * 0.5 + 0.2,
      });
    }
    setCloudPositions(newClouds);
  }, []);

  // Плавная смена времени суток по реальному времени
  useEffect(() => {
    const cycleTime = () => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const totalMinutes = hours * 60 + minutes;

      // День: 6:00 - 18:00
      // Вечер: 18:00 - 19:30
      // Ночь: 19:30 - 5:30
      // Рассвет: 5:30 - 6:00

      if (totalMinutes >= 330 && totalMinutes < 360) { // 5:30 - 6:00 рассвет
        setTimeOfDay('dawn');
      } else if (totalMinutes >= 360 && totalMinutes < 1080) { // 6:00 - 18:00 день
        setTimeOfDay('day');
      } else if (totalMinutes >= 1080 && totalMinutes < 1170) { // 18:00 - 19:30 закат
        setTimeOfDay('dusk');
      } else { // 19:30 - 5:30 ночь
        setTimeOfDay('night');
      }
    };

    cycleTime();
    const interval = setInterval(cycleTime, 60000); // Проверяем каждую минуту

    return () => clearInterval(interval);
  }, []);

  // Анимация облаков
  useEffect(() => {
    const animateClouds = () => {
      setCloudPositions(prev => 
        prev.map(cloud => ({
          ...cloud,
          x: (cloud.x + cloud.speed * 0.1) % 120,
        }))
      );
    };

    const interval = setInterval(animateClouds, 100);
    return () => clearInterval(interval);
  }, []);

  // Цвета для разных времен суток
  const colors: Record<string, TimeColors> = {
    day: {
      skyTop: '#4AB5E0',
      skyBottom: '#87CEEB',
      horizon: '#FFB347',
      sun: '#FFD700',
      sunGlow: '#FFA500',
      cloudColor: '#FFFFFF',
      cloudGlow: '#FFE4B5',
    },
    dusk: {
      skyTop: '#2C3E50',
      skyBottom: '#E67E22',
      horizon: '#C0392B',
      sun: '#F39C12',
      sunGlow: '#E67E22',
      cloudColor: '#E0E0E0',
      cloudGlow: '#FF8C00',
    },
    night: {
      skyTop: '#0A0A2A',
      skyBottom: '#1A1A4A',
      horizon: '#2A1A3A',
      moon: '#F0F8FF',
      moonGlow: '#B0C4DE',
      cloudColor: '#2A2A4A',
      cloudGlow: '#3A3A5A',
    },
    dawn: {
      skyTop: '#FFB6C1',
      skyBottom: '#87CEEB',
      horizon: '#FF69B4',
      sun: '#FFD700',
      sunGlow: '#FFA07A',
      cloudColor: '#FFE4E1',
      cloudGlow: '#FFB6C1',
    },
  };

  const current = colors[timeOfDay];

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        background: `linear-gradient(180deg, ${current.skyTop} 0%, ${current.skyBottom} 70%, ${current.horizon} 100%)`,
        transition: 'background 2s ease-in-out',
        overflow: 'hidden',
      }}
    >
      {/* Солнце или Луна */}
      <Box
        sx={{
          position: 'absolute',
          top: timeOfDay === 'night' ? '15%' : '10%',
          right: timeOfDay === 'night' ? '15%' : '10%',
          width: timeOfDay === 'night' ? 60 : 80,
          height: timeOfDay === 'night' ? 60 : 80,
          borderRadius: '50%',
          background: timeOfDay === 'night'
            ? `radial-gradient(circle at 30% 30%, ${colors.night.moon} 0%, ${colors.night.moonGlow} 100%)`
            : `radial-gradient(circle at 30% 30%, ${colors.day.sun} 0%, ${colors.day.sunGlow} 100%)`,
          boxShadow: timeOfDay === 'night'
            ? `0 0 50px ${colors.night.moonGlow}`
            : `0 0 100px ${colors.day.sunGlow}`,
          transition: 'all 2s ease-in-out',
          animation: timeOfDay === 'night'
            ? 'moonMove 20s linear infinite'
            : 'sunMove 20s linear infinite',
          '@keyframes sunMove': {
            '0%': { transform: 'translate(0, 0)' },
            '25%': { transform: 'translate(-20px, 10px)' },
            '50%': { transform: 'translate(-40px, 20px)' },
            '75%': { transform: 'translate(-20px, 10px)' },
            '100%': { transform: 'translate(0, 0)' },
          },
          '@keyframes moonMove': {
            '0%': { transform: 'translate(0, 0)' },
            '25%': { transform: 'translate(-10px, 5px)' },
            '50%': { transform: 'translate(-20px, 10px)' },
            '75%': { transform: 'translate(-10px, 5px)' },
            '100%': { transform: 'translate(0, 0)' },
          },
        }}
      >
        {/* Кратеры на луне (только ночью) */}
        {timeOfDay === 'night' && (
          <>
            <Box sx={{
              position: 'absolute',
              top: '20%',
              left: '20%',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.2)',
            }} />
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '60%',
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.2)',
            }} />
          </>
        )}
      </Box>

      {/* Звезды (ночью и на рассвете/закате) */}
      {(timeOfDay === 'night' || timeOfDay === 'dusk' || timeOfDay === 'dawn') && 
        stars.map((star, i) => {
          const opacity = timeOfDay === 'night' 
            ? 0.7 
            : timeOfDay === 'dusk' 
              ? 0.3 
              : 0.1;
          
          return (
            <Box
              key={`star-${i}`}
              sx={{
                position: 'absolute',
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                backgroundColor: '#FFFFFF',
                borderRadius: '50%',
                opacity: opacity,
                animation: `twinkle ${star.twinkleSpeed}s infinite`,
                transition: 'opacity 2s ease-in-out',
                '@keyframes twinkle': {
                  '0%, 100%': { opacity: opacity * 0.5 },
                  '50%': { opacity: opacity },
                },
              }}
            />
          );
        })
      }

      {/* Облака */}
      {cloudPositions.map((cloud, i) => {
        const cloudOpacity = timeOfDay === 'night' ? 0.3 : 0.8;
        const cloudColor = timeOfDay === 'night' ? colors.night.cloudColor : colors.day.cloudColor;
        
        return (
          <Box
            key={`cloud-${i}`}
            sx={{
              position: 'absolute',
              left: `${cloud.x}%`,
              top: `${cloud.y}%`,
              opacity: cloudOpacity,
              filter: timeOfDay === 'night' ? 'brightness(0.5)' : 'none',
              transition: 'all 2s ease-in-out',
              pointerEvents: 'none',
            }}
          >
            <Box sx={{ position: 'relative', width: 120, height: 50 }}>
              <Box sx={{
                position: 'absolute',
                width: 60,
                height: 40,
                borderRadius: '50%',
                background: cloudColor,
                left: 0,
                top: 5,
                boxShadow: timeOfDay === 'night' ? 'none' : '0 0 20px rgba(255,255,255,0.5)',
              }} />
              <Box sx={{
                position: 'absolute',
                width: 70,
                height: 45,
                borderRadius: '50%',
                background: cloudColor,
                left: 25,
                top: 0,
                boxShadow: timeOfDay === 'night' ? 'none' : '0 0 20px rgba(255,255,255,0.5)',
              }} />
              <Box sx={{
                position: 'absolute',
                width: 55,
                height: 35,
                borderRadius: '50%',
                background: cloudColor,
                left: 55,
                top: 10,
                boxShadow: timeOfDay === 'night' ? 'none' : '0 0 20px rgba(255,255,255,0.5)',
              }} />
            </Box>
          </Box>
        );
      })}

      {/* Птицы (днем) */}
      {timeOfDay === 'day' && (
        <Box sx={{
          position: 'absolute',
          top: '15%',
          left: '20%',
          animation: 'fly 30s linear infinite',
          '@keyframes fly': {
            '0%': { transform: 'translateX(-100px)' },
            '100%': { transform: 'translateX(2000px)' },
          },
        }}>
          <span style={{ fontSize: '20px', opacity: 0.6 }}>🕊️</span>
          <span style={{ fontSize: '20px', marginLeft: '10px', opacity: 0.6 }}>🕊️</span>
          <span style={{ fontSize: '20px', marginLeft: '10px', opacity: 0.6 }}>🕊️</span>
        </Box>
      )}

      {/* Светлячки (ночью) */}
      {timeOfDay === 'night' && (
        <>
          {[...Array(10)].map((_, i) => (
            <Box
              key={`firefly-${i}`}
              sx={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60 + 20}%`,
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: '#FFFF00',
                boxShadow: '0 0 10px #FFFF00',
                animation: `firefly ${Math.random() * 5 + 5}s infinite`,
                '@keyframes firefly': {
                  '0%, 100%': { opacity: 0, transform: 'translate(0, 0)' },
                  '25%': { opacity: 1, transform: 'translate(20px, -10px)' },
                  '50%': { opacity: 0.5, transform: 'translate(40px, 10px)' },
                  '75%': { opacity: 1, transform: 'translate(60px, -5px)' },
                },
              }}
            />
          ))}
        </>
      )}

      {/* Трава внизу (как в Terraria) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '32px',
          background: 'repeating-linear-gradient(90deg, #5D7B5D 0px, #5D7B5D 16px, #4A6A4A 16px, #4A6A4A 32px)',
          borderTop: '4px solid #3E543E',
          boxShadow: '0 -4px 0 #2A3A2A',
          transition: 'background 2s ease-in-out',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-8px',
            left: 0,
            right: 0,
            height: '8px',
            background: 'repeating-linear-gradient(90deg, #6B8E6B 0px, #6B8E6B 8px, #5D7B5D 8px, #5D7B5D 16px)',
          },
        }}
      >
        {/* Цветочки */}
        {timeOfDay === 'day' && [...Array(20)].map((_, i) => (
          <Box
            key={`flower-${i}`}
            sx={{
              position: 'absolute',
              bottom: '32px',
              left: `${i * 5 + Math.random() * 2}%`,
              fontSize: '12px',
              color: i % 2 === 0 ? '#FF69B4' : '#FFD700',
              animation: `wave ${Math.random() * 2 + 2}s infinite`,
              '@keyframes wave': {
                '0%, 100%': { transform: 'rotate(0deg)' },
                '50%': { transform: 'rotate(5deg)' },
              },
            }}
          >
            {i % 2 === 0 ? '🌸' : '🌼'}
          </Box>
        ))}
      </Box>

      {/* Индикатор времени суток */}
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          left: 10,
          padding: '4px 8px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: 4,
          color: 'white',
          fontSize: '12px',
          fontFamily: '"Courier New", monospace',
          zIndex: 20,
        }}
      >
        {timeOfDay === 'day' && '☀️ День'}
        {timeOfDay === 'dusk' && '🌆 Закат'}
        {timeOfDay === 'night' && '🌙 Ночь'}
        {timeOfDay === 'dawn' && '🌅 Рассвет'}
      </Box>

      {/* Контент поверх фона */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default TerrariaBackground;
