import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'your-api-key-here',
  dangerouslyAllowBrowser: true
});

export const generateATSDescription = async (experience: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert ATS resume optimizer. Convert job descriptions into ATS-friendly bullet points that highlight achievements and use relevant keywords."
        },
        {
          role: "user",
          content: `Optimize this job description for ATS: ${experience}`
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    });

    return response.choices[0].message.content || experience;
  } catch (error) {
    console.error('Error generating ATS description:', error);
    return experience;
  }
};