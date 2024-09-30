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
      model: 'gpt-3.5-turbo',
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

export const textToSpeech = async (text, lang) => {
  // 实现文本转语音
  // 注意：OpenAI 目前没有直接的文本转语音 API，这里需要使用其他服务
  console.log('Text to speech not implemented');
};

export const speechToText = async (audioBlob, lang) => {
  // 实现语音转文本
  // 注意：这需要先将音频转换为适当的格式
  console.log('Speech to text not implemented');
};
