import { AIGenerateRequest } from './ai';

export interface AIGenerateRequest {
  type: 'summary' | 'experience' | 'skills' | 'education';
  context?: string;
}

export async function generateContent({ type, context = '' }: AIGenerateRequest): Promise<string> {
  const prompts = {
    summary: `Write a professional summary for a resume. Context: ${context}`,
    experience: `Write a professional work experience description for a resume. Context: ${context}`,
    skills: `List relevant professional skills for a resume. Context: ${context}`,
    education: `Write an education entry for a resume. Context: ${context}`
  };

  try {
    // Using free text generation API
    const response = await fetch('https://api-inference.huggingface.co/models/bigscience/bloom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompts[type],
        parameters: {
          max_length: 200,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate content');
    }

    const data = await response.json();
    // Clean up the generated text
    let generatedText = data[0]?.generated_text || '';
    generatedText = generatedText.replace(prompts[type], '').trim();

    // Fallback content if AI generation fails
    const fallbackContent = {
      summary: "Experienced professional with a proven track record of success in delivering results. Strong analytical and problem-solving skills combined with excellent communication abilities.",
      experience: "• Successfully managed and delivered key projects\n• Collaborated with cross-functional teams\n• Improved efficiency and productivity\n• Demonstrated leadership and initiative",
      skills: "• Project Management\n• Team Leadership\n• Problem Solving\n• Communication\n• Time Management\n• Analytical Skills",
      education: "Completed coursework with focus on practical applications and theoretical foundations. Participated in relevant projects and activities."
    };

    return generatedText || fallbackContent[type];
  } catch (error) {
    console.error('Error generating content:', error);
    // Return fallback content if AI fails
    const fallbackContent = {
      summary: "Experienced professional with a proven track record of success in delivering results. Strong analytical and problem-solving skills combined with excellent communication abilities.",
      experience: "• Successfully managed and delivered key projects\n• Collaborated with cross-functional teams\n• Improved efficiency and productivity\n• Demonstrated leadership and initiative",
      skills: "• Project Management\n• Team Leadership\n• Problem Solving\n• Communication\n• Time Management\n• Analytical Skills",
      education: "Completed coursework with focus on practical applications and theoretical foundations. Participated in relevant projects and activities."
    };
    return fallbackContent[type];
  }
}
