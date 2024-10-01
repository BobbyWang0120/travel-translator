import React, { useState, useRef } from 'react';
import { TextField, IconButton, Box } from '@mui/material';
import { Mic, Stop, VolumeUp } from '@mui/icons-material';
import { useTranslation } from '../context/TranslationContext';
import { textToSpeech } from '../services/openai';

function TranslationArea({ isSource }) {
  const { sourceText, translatedText, handleSpeechInput, playOppositeText } =
    useTranslation();
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const options = {};

      // 检查浏览器是否支持 MediaRecorder 的 mimeType
      if (MediaRecorder.isTypeSupported('audio/webm')) {
        options.mimeType = 'audio/webm';
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        options.mimeType = 'audio/mp4';
      }

      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start(1000); // 每秒触发一次 dataavailable 事件
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing the microphone', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/mp3',
        });
        await handleSpeechInput(audioBlob, isSource);
      };
    }
  };

  const handleSpeechToText = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleTextToSpeech = () => {
    playOppositeText(isSource);
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={isSource ? sourceText : translatedText}
        placeholder={isSource ? '输入要翻译的文本' : 'Translated text'}
        InputProps={{
          readOnly: true,
          style: { fontSize: '1.5rem' },
        }}
        variant='outlined'
        sx={{ flex: 1, mb: 1 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton onClick={handleSpeechToText} color='primary' size='large'>
          {isRecording ? (
            <Stop sx={{ fontSize: 40 }} />
          ) : (
            <Mic sx={{ fontSize: 40 }} />
          )}
        </IconButton>
        <IconButton onClick={handleTextToSpeech} color='secondary' size='large'>
          <VolumeUp sx={{ fontSize: 40 }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default TranslationArea;
