import React from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Divider,
} from '@mui/material';
import LanguageSelector from './components/LanguageSelector';
import TranslationArea from './components/TranslationArea';
import { TranslationProvider } from './context/TranslationContext';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          overflow: 'hidden',
          position: 'fixed',
          width: '100%',
          height: '100%',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TranslationProvider>
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column-reverse',
              transform: 'rotate(180deg)',
            }}
          >
            <TranslationArea isSource={false} />
            <LanguageSelector isSource={false} />
          </Box>
          <Divider />
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <LanguageSelector isSource={true} />
            <TranslationArea isSource={true} />
          </Box>
        </Box>
      </TranslationProvider>
    </ThemeProvider>
  );
}

export default App;
