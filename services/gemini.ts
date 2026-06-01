import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface WordInfo { definition: string; example: string; turkish: string; }
export interface QuizQ { question: string; options: string[]; answer: string; explanation: string; }

export const getWordInfo = async (word: string, topic: string): Promise<WordInfo | null> => {
  try {
    const r = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Define "${word}" at A2-B1 level in the context of ${topic}. Give a simple definition, one example sentence, and the Turkish translation.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            definition: { type: Type.STRING },
            example: { type: Type.STRING },
            turkish: { type: Type.STRING },
          },
          required: ['definition', 'example', 'turkish'],
        },
      },
    });
    return JSON.parse(r.text);
  } catch { return null; }
};

export const generateQuiz = async (words: string[], topic: string, count = 5): Promise<QuizQ[]> => {
  try {
    const r = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Create ${count} multiple-choice questions for A2-B1 students on the topic "${topic}". Use these words: ${words.slice(0, 20).join(', ')}. 4 options each, one correct.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING }, options: { type: Type.ARRAY, items: { type: Type.STRING } },
              answer: { type: Type.STRING }, explanation: { type: Type.STRING },
            },
            required: ['question', 'options', 'answer', 'explanation'],
          },
        },
      },
    });
    return JSON.parse(r.text);
  } catch { return []; }
};
