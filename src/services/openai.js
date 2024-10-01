import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1';

const openai = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const translateText = async (text, sourceLang, targetLang) => {
  try {
    const response = await openai.post('/chat/completions', {
      model: 'gpt-3.5-turbo-0125',
      messages: [
        {
          role: 'system',
          content: `You are a translator. Translate from ${sourceLang} to ${targetLang}.`,
        },
        { role: 'user', content: text },
      ],
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Translation error:', error);
    return 'Translation error occurred.';
  }
};

export const transcribeAudio = async (audioBlob) => {
  const formData = new FormData();
  formData.append('file', audioBlob, 'audio.mp3');
  formData.append('model', 'whisper-1');
  formData.append('language', 'zh');

  try {
    const response = await axios.post(
      `${API_URL}/audio/transcriptions`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.text;
  } catch (error) {
    console.error('Transcription error:', error);
    return 'Transcription error occurred.';
  }
};

export const textToSpeech = async (text, lang) => {
  // 实现文本转语音
  console.log('Text to speech not implemented');
};
