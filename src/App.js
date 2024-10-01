import React, { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Divider,
} from '@mui/material';
import LanguageSelector from './components/LanguageSelector';
import TranslationArea from './components/TranslationArea';

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
  const [sourceLang, setSourceLang] = useState('zh');
  const [targetLang, setTargetLang] = useState('en');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
          <TranslationArea
            isSource={false}
            sourceLang={sourceLang}
            targetLang={targetLang}
          />
          <LanguageSelector value={targetLang} onChange={setTargetLang} />
        </Box>
        <Divider />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <LanguageSelector value={sourceLang} onChange={setSourceLang} />
          <TranslationArea
            isSource={true}
            sourceLang={sourceLang}
            targetLang={targetLang}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
