import React from 'react';
import { FormControl, Select, MenuItem, Box } from '@mui/material';

const languages = [
  { code: 'zh', name: '中文' },
  { code: 'en', name: '英语' },
  { code: 'ja', name: '日语' },
  { code: 'ko', name: '韩语' },
  { code: 'fr', name: '法语' },
  { code: 'de', name: '德语' },
];

function LanguageSelector({ value, onChange }) {
  return (
    <Box sx={{ p: 2 }}>
      <FormControl fullWidth size='small'>
        <Select value={value} onChange={(e) => onChange(e.target.value)}>
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
