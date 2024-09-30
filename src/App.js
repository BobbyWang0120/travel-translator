import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import LanguageSelector from './components/LanguageSelector';
import TranslationArea from './components/TranslationArea';
import './App.css';

const theme = createTheme();

function App() {
  const [sourceLang, setSourceLang] = useState('zh');
  const [targetLang, setTargetLang] = useState('en');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth='sm'>
        <Typography variant='h4' align='center' gutterBottom>
          旅行翻译器
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <LanguageSelector
                label='源语言'
                value={sourceLang}
                onChange={setSourceLang}
              />
              <TranslationArea
                isSource={true}
                sourceLang={sourceLang}
                targetLang={targetLang}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <LanguageSelector
                label='目标语言'
                value={targetLang}
                onChange={setTargetLang}
              />
              <TranslationArea
                isSource={false}
                sourceLang={sourceLang}
                targetLang={targetLang}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
