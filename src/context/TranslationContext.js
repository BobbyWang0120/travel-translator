import React, { createContext, useState, useContext } from 'react';
import { transcribeAudio, translateText } from '../services/openai';

const TranslationContext = createContext();

export const useTranslation = () => useContext(TranslationContext);

export const TranslationProvider = ({ children }) => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('zh');
  const [targetLang, setTargetLang] = useState('en');

  // 处理语音输入的函数
  const handleSpeechInput = async (audioBlob, isSource) => {
    try {
      // 转录音频为文本
      const transcription = await transcribeAudio(audioBlob);
      if (isSource) {
        // 如果是源语言，设置源文本
        setSourceText(transcription);
        // 翻译源文本到目标语言
        const translated = await translateText(
          transcription,
          sourceLang,
          targetLang
        );
        // 设置翻译后的文本
        setTranslatedText(translated);
      } else {
        // 如果是目标语言，设置翻译后的文本
        setTranslatedText(transcription);
        // 翻译目标文本到源语言
        const translated = await translateText(
          transcription,
          targetLang,
          sourceLang
        );
        // 设置源文本
        setSourceText(translated);
      }
    } catch (error) {
      // 处理错误
      console.error('Error processing speech input:', error);
    }
  };

  return (
    <TranslationContext.Provider
      value={{
        sourceText,
        setSourceText,
        translatedText,
        setTranslatedText,
        sourceLang,
        setSourceLang,
        targetLang,
        setTargetLang,
        handleSpeechInput,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};
