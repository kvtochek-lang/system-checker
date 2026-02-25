import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  CircularProgress
} from '@mui/material';
import { Search, VideogameAsset, Work } from '@mui/icons-material';

// Временные данные для демонстрации
const softwareList = [
  { id: 'cyberpunk-2077', name: 'Cyberpunk 2077', category: 'game', icon: '🎮' },
  { id: 'bg3', name: 'Baldur\'s Gate 3', category: 'game', icon: '🎮' },
  { id: 'starfield', name: 'Starfield', category: 'game', icon: '🎮' },
  { id: 'photoshop', name: 'Adobe Photoshop', category: 'professional', icon: '🎨' },
  { id: 'blender', name: 'Blender', category: 'professional', icon: '🎨' },
  { id: 'autocad', name: 'AutoCAD', category: 'professional', icon: '📐' },
];

interface SoftwareSearchProps {
  onSelect: (softwareId: string) => void;
  isLoading?: boolean;
}

const SoftwareSearch: React.FC<SoftwareSearchProps> = ({ onSelect, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredSoftware = softwareList.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onSelect(id);
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Search sx={{ mr: 1 }} />
          Выберите программу для проверки
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Поиск игры или программы..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List sx={{ maxHeight: 300, overflow: 'auto' }}>
            {filteredSoftware.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  selected={selectedId === item.id}
                  onClick={() => handleSelect(item.id)}
                >
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {item.category === 'game' ? (
                          <VideogameAsset fontSize="small" />
                        ) : (
                          <Work fontSize="small" />
                        )}
                        {item.category === 'game' ? 'Игра' : 'Профессиональное ПО'}
                      </Box>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default SoftwareSearch;
