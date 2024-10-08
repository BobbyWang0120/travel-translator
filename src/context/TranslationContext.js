import React, { createContext, useState, useContext } from 'react';
import {
  transcribeAudio,
  translateText,
  textToSpeech,
} from '../services/openai';

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
        // 自动朗读翻译后的文本
        const audioUrl = await textToSpeech(translated, targetLang);
        if (audioUrl) {
          const audio = new Audio(audioUrl);
          audio.play();
        }
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
        // 自动朗读翻译后的文本
        const audioUrl = await textToSpeech(translated, sourceLang);
        if (audioUrl) {
          const audio = new Audio(audioUrl);
          audio.play();
        }
      }
    } catch (error) {
      // 处理错误
      console.error('Error processing speech input:', error);
    }
  };

  const playOppositeText = async (isSource) => {
    const textToPlay = isSource ? translatedText : sourceText;
    const langToUse = isSource ? targetLang : sourceLang;
    const audioUrl = await textToSpeech(textToPlay, langToUse);
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
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
        playOppositeText,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};
