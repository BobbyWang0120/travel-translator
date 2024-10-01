import React from 'react';
import { FormControl, Select, MenuItem, Box } from '@mui/material';
import { useTranslation } from '../context/TranslationContext';

const languages = [
  { code: 'zh', name: '中文' },
  { code: 'en', name: '英语' },
  { code: 'ja', name: '日语' },
  { code: 'ko', name: '韩语' },
  { code: 'fr', name: '法语' },
  { code: 'de', name: '德语' },
];

function LanguageSelector({ isSource }) {
  const { sourceLang, setSourceLang, targetLang, setTargetLang } =
    useTranslation();

  const handleChange = (event) => {
    if (isSource) {
      setSourceLang(event.target.value);
    } else {
      setTargetLang(event.target.value);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <FormControl fullWidth size='small'>
        <Select
          value={isSource ? sourceLang : targetLang}
          onChange={handleChange}
        >
          {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default LanguageSelector;
