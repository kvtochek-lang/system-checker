import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Alert,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Pagination
} from '@mui/material';
import { Search, VideogameAsset, Work } from '@mui/icons-material';
import { getSoftwareList } from '../services/api';

interface Software {
  id: string;
  name: string;
  category: string;
}

interface SoftwareSearchProps {
  onSelect: (softwareId: string) => void;
  isLoading?: boolean;
}

const SoftwareSearch: React.FC<SoftwareSearchProps> = ({ onSelect, isLoading: externalLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [softwareList, setSoftwareList] = useState<Software[]>([]);
  const [filteredList, setFilteredList] = useState<Software[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  // Загружаем список ПО при монтировании компонента
  useEffect(() => {
    const loadSoftware = async () => {
      try {
        setLoading(true);
        const data = await getSoftwareList();
        console.log('Loaded software:', data.length);
        setSoftwareList(data);
        setFilteredList(data);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить список программ. Убедитесь, что сервер запущен.');
        console.error('Ошибка загрузки:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSoftware();
  }, []);

  // Фильтрация при изменении поиска или категории
  useEffect(() => {
    let filtered = softwareList;
    
    // Фильтр по категории
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    
    // Фильтр по поиску
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredList(filtered);
    setPage(1); // Сбрасываем страницу при изменении фильтров
  }, [searchTerm, categoryFilter, softwareList]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onSelect(id);
  };

  const handleCategoryChange = (event: any) => {
    setCategoryFilter(event.target.value);
  };

  // Пагинация
  const pageCount = Math.ceil(filteredList.length / itemsPerPage);
  const displayedItems = filteredList.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (error) {
    return (
      <Card elevation={3}>
        <CardContent>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Typography variant="body2" color="text.secondary">
            Убедитесь, что сервер запущен на порту 3001 и выполните команду:
          </Typography>
          <Box component="pre" sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mt: 1 }}>
            cd server && npm run dev
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Search sx={{ mr: 1 }} />
          Выберите программу для проверки
          {!loading && (
            <Chip 
              label={`Всего: ${softwareList.length}`} 
              size="small" 
              sx={{ ml: 2 }}
              color="primary"
            />
          )}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={8}>
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
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Категория</InputLabel>
              <Select
                value={categoryFilter}
                label="Категория"
                onChange={handleCategoryChange}
              >
                <MenuItem value="all">Все</MenuItem>
                <MenuItem value="game">Игры</MenuItem>
                <MenuItem value="professional">Профессиональное ПО</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {loading || externalLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Найдено: {filteredList.length} программ
            </Typography>
            
            <List sx={{ maxHeight: 400, overflow: 'auto', mb: 2 }}>
              {displayedItems.length === 0 ? (
                <ListItem>
                  <ListItemText primary="Ничего не найдено" />
                </ListItem>
              ) : (
                displayedItems.map((item) => (
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
                ))
              )}
            </List>

            {pageCount > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SoftwareSearch;
