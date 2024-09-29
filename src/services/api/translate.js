import axios from 'axios';

export const translateText = async (text, targetLang) => {
  try {
    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: `en|${targetLang}`
      }
    });
    return response.data.responseData.translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    return null;
  }
};