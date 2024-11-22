import { ResumeTemplate, ResumeData } from '../types';

// Free APIs we'll use
const FREE_APIS = {
  quotes: 'https://api.quotable.io/random',
  words: 'https://api.datamuse.com/words',
  facts: 'https://uselessfacts.jsph.pl/random.json?language=en',
  advice: 'https://api.adviceslip.com/advice',
  activities: 'https://www.boredapi.com/api/activity',
};

// Template Styles
export const TEMPLATE_STYLES = {
  MODERN: 'modern',
  CLASSIC: 'classic',
  MINIMAL: 'minimal',
  CREATIVE: 'creative',
  PROFESSIONAL: 'professional',
  EXECUTIVE: 'executive',
  TECHNICAL: 'technical',
  ACADEMIC: 'academic',
  STARTUP: 'startup',
  ELEGANT: 'elegant',
  DYNAMIC: 'dynamic',
  GRADIENT: 'gradient',
  MINIMALIST: 'minimalist',
  BOLD: 'bold',
  FUTURISTIC: 'futuristic',
} as const;

// Color Schemes
export const COLOR_SCHEMES = {
  PURPLE: {
    primary: '#6B46C1',
    secondary: '#9F7AEA',
    accent: '#B794F4',
    text: '#2D3748',
    background: '#FFFFFF',
  },
  BLUE: {
    primary: '#2B6CB0',
    secondary: '#4299E1',
    accent: '#63B3ED',
    text: '#2D3748',
    background: '#FFFFFF',
  },
  GREEN: {
    primary: '#2F855A',
    secondary: '#48BB78',
    accent: '#68D391',
    text: '#2D3748',
    background: '#FFFFFF',
  },
  DARK: {
    primary: '#1A202C',
    secondary: '#2D3748',
    accent: '#4A5568',
    text: '#FFFFFF',
    background: '#171923',
  },
  ELEGANT: {
    primary: '#744210',
    secondary: '#975A16',
    accent: '#B7791F',
    text: '#2D3748',
    background: '#FFFFF0',
  },
  SUNSET: {
    primary: '#F6AD55',
    secondary: '#ED8936',
    accent: '#DD6B20',
    text: '#2D3748',
    background: '#FFFAF0',
  },
  OCEAN: {
    primary: '#2B6CB0',
    secondary: '#4299E1',
    accent: '#63B3ED',
    text: '#2D3748',
    background: '#EBF8FF',
  },
  FOREST: {
    primary: '#2F855A',
    secondary: '#48BB78',
    accent: '#68D391',
    text: '#2D3748',
    background: '#F0FFF4',
  },
  MIDNIGHT: {
    primary: '#2A4365',
    secondary: '#2B6CB0',
    accent: '#4299E1',
    text: '#E2E8F0',
    background: '#1A365D',
  },
  ROSE: {
    primary: '#B83280',
    secondary: '#D53F8C',
    accent: '#ED64A6',
    text: '#2D3748',
    background: '#FFF5F7',
  },
};

// Font Combinations
export const FONT_COMBINATIONS = {
  MODERN: {
    heading: 'Inter',
    body: 'Inter',
  },
  CLASSIC: {
    heading: 'Merriweather',
    body: 'Source Sans Pro',
  },
  MINIMAL: {
    heading: 'Work Sans',
    body: 'Work Sans',
  },
  CREATIVE: {
    heading: 'Playfair Display',
    body: 'Raleway',
  },
  PROFESSIONAL: {
    heading: 'Montserrat',
    body: 'Open Sans',
  },
  ELEGANT: {
    heading: 'Cormorant Garamond',
    body: 'Lora',
  },
  TECH: {
    heading: 'Space Grotesk',
    body: 'IBM Plex Sans',
  },
  MODERN_SERIF: {
    heading: 'DM Serif Display',
    body: 'DM Sans',
  },
  GEOMETRIC: {
    heading: 'Outfit',
    body: 'Plus Jakarta Sans',
  },
  CLASSIC_SERIF: {
    heading: 'Spectral',
    body: 'Source Serif Pro',
  },
};

// Template Background Images
export const BACKGROUND_IMAGES = {
  MODERN: [
    'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800&auto=format&fit=crop&q=80',
  ],
  CLASSIC: [
    'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=800&auto=format&fit=crop&q=80',
  ],
  MINIMAL: [
    'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1557682260-96773eb01377?w=800&auto=format&fit=crop&q=80',
  ],
  CREATIVE: [
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1550745165-3bc6d5a12fcc?w=800&auto=format&fit=crop&q=80',
  ],
  PROFESSIONAL: [
    'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1557683304-673a23048d34?w=800&auto=format&fit=crop&q=80',
  ],
};

// Visual Effects
export const VISUAL_EFFECTS = {
  GRADIENT: {
    type: 'gradient',
    colors: ['from-purple-500', 'to-pink-500'],
    opacity: 0.1,
  },
  MESH: {
    type: 'mesh',
    pattern: 'diagonal',
    opacity: 0.05,
  },
  DOTS: {
    type: 'dots',
    size: 2,
    spacing: 20,
    opacity: 0.1,
  },
  LINES: {
    type: 'lines',
    thickness: 1,
    spacing: 40,
    opacity: 0.1,
  },
  WAVES: {
    type: 'waves',
    amplitude: 20,
    frequency: 100,
    opacity: 0.1,
  },
};

// Layout Templates
const LAYOUT_TEMPLATES = {
  SINGLE_COLUMN: {
    id: 'single-column',
    name: 'Single Column',
    sections: ['header', 'summary', 'experience', 'education', 'skills'],
    className: 'max-w-2xl mx-auto space-y-6',
  },
  TWO_COLUMN: {
    id: 'two-column',
    name: 'Two Column',
    sections: [
      ['header'],
      ['summary', 'experience'],
      ['education', 'skills'],
    ],
    className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  },
  MODERN_SPLIT: {
    id: 'modern-split',
    name: 'Modern Split',
    sections: [
      ['header', 'summary'],
      ['skills'],
      ['experience', 'education'],
    ],
    className: 'grid grid-cols-1 md:grid-cols-3 gap-6',
  },
  MODERN_CARDS: {
    id: 'modern-cards',
    name: 'Modern Cards',
    sections: [
      ['header'],
      ['summary', 'skills'],
      ['experience'],
      ['education'],
    ],
    className: 'grid gap-6',
  },
  TIMELINE: {
    id: 'timeline',
    name: 'Timeline',
    sections: [
      ['header', 'summary'],
      ['experience', 'education'],
      ['skills'],
    ],
    className: 'space-y-8 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200',
  },
  MAGAZINE: {
    id: 'magazine',
    name: 'Magazine',
    sections: [
      ['header'],
      ['summary', 'skills'],
      ['experience', 'education'],
    ],
    className: 'grid grid-cols-12 gap-6',
  },
};

// Professional Summary Templates
const SUMMARY_TEMPLATES = {
  PROFESSIONAL: [
    'Accomplished {role} with {years}+ years of experience in {industry}. Proven track record of {achievement} and {skill}. Seeking to leverage expertise in {expertise} to drive success in a challenging role.',
    'Results-driven {role} specializing in {expertise}. Demonstrated success in {achievement} through innovative approaches and {skill}. Committed to delivering exceptional results in fast-paced environments.',
    'Strategic {role} with extensive experience in {industry}. Expert in {expertise} with a focus on {achievement}. Proven ability to {skill} while maintaining high standards of excellence.',
  ],
  CREATIVE: [
    'Innovative {role} passionate about {expertise}. Bringing fresh perspectives to {industry} through {skill} and creative problem-solving. Known for {achievement} with a unique approach.',
    'Forward-thinking {role} with a creative edge in {industry}. Combines {skill} with artistic vision to achieve {achievement}. Eager to bring creative solutions to challenging projects.',
    'Imaginative {role} with a proven ability to think outside the box. Specializing in {expertise} with a focus on {achievement}. Brings creativity and {skill} to every project.',
  ],
  TECHNICAL: [
    'Tech-savvy {role} with deep expertise in {expertise}. Proven track record of {achievement} using cutting-edge technologies. Skilled in {skill} and continuous learning.',
    'Detail-oriented {role} specializing in {industry} technologies. Expert in {expertise} with demonstrated success in {achievement}. Strong foundation in {skill}.',
    'Analytical {role} with a focus on technological innovation. Experienced in {expertise} and {skill}. Proven history of {achievement} through technical excellence.',
  ],
};

// Experience Description Templates
const EXPERIENCE_TEMPLATES = {
  ACHIEVEMENT: [
    'Led {project} initiative resulting in {result}% improvement in {metric}',
    'Spearheaded {project} that generated {result} in {metric} within {timeframe}',
    'Implemented {project} strategy leading to {result}% increase in {metric}',
  ],
  RESPONSIBILITY: [
    'Managed team of {size} professionals working on {project}',
    'Oversaw {project} operations with annual budget of {budget}',
    'Developed and maintained {project} serving {size} users',
  ],
  TECHNICAL: [
    'Architected and deployed {project} using {technologies}',
    'Optimized {project} performance resulting in {result}% improvement',
    'Implemented {technologies} solution for {project} requirements',
  ],
};

// Skill Section Templates
const SKILLS_TEMPLATES = {
  TECHNICAL: [
    'Programming Languages',
    'Web Technologies',
    'Database Systems',
    'Cloud Platforms',
    'Development Tools',
  ],
  SOFT: [
    'Leadership',
    'Communication',
    'Problem Solving',
    'Team Collaboration',
    'Project Management',
  ],
  CREATIVE: [
    'Design Tools',
    'Visual Communication',
    'Content Creation',
    'Brand Development',
    'User Experience',
  ],
};

// Helper function to get random item from array
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Helper function to fetch data from free APIs
const fetchFromAPI = async (apiUrl: string) => {
  try {
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (error) {
    console.error('Error fetching from API:', error);
    return null;
  }
};

// Generate dynamic template variations
const generateTemplateVariations = async (template: string, context: any = {}) => {
  try {
    // Get random words for variation
    const words = await fetchFromAPI(`${FREE_APIS.words}?rel_syn=${context.industry || 'business'}`);
    const synonyms = words?.map((w: any) => w.word) || [];

    // Get random quote for inspiration
    const quote = await fetchFromAPI(FREE_APIS.quotes);
    
    // Replace template variables with context and random variations
    let result = template;
    Object.entries(context).forEach(([key, value]) => {
      result = result.replace(`{${key}}`, value as string);
    });

    // Replace any remaining placeholders with random synonyms
    const placeholders = result.match(/{([^}]+)}/g) || [];
    placeholders.forEach((placeholder) => {
      const randomSynonym = getRandomItem(synonyms) || placeholder.replace(/{|}/g, '');
      result = result.replace(placeholder, randomSynonym);
    });

    return result;
  } catch (error) {
    console.error('Error generating template variation:', error);
    return template;
  }
};

// Generate a complete resume template
export const generateResumeTemplate = async (
  style: keyof typeof TEMPLATE_STYLES,
  context: Partial<ResumeData>
): Promise<ResumeTemplate> => {
  // Get base templates
  const summaryTemplate = getRandomItem(SUMMARY_TEMPLATES[style] || SUMMARY_TEMPLATES.PROFESSIONAL);
  const experienceTemplates = EXPERIENCE_TEMPLATES[style] || EXPERIENCE_TEMPLATES.ACHIEVEMENT;
  const skillsCategories = SKILLS_TEMPLATES[style] || SKILLS_TEMPLATES.TECHNICAL;

  // Get random background image
  const backgroundImages = BACKGROUND_IMAGES[style] || BACKGROUND_IMAGES.MODERN;
  const backgroundImage = getRandomItem(backgroundImages);

  // Get visual effects
  const visualEffect = getRandomItem(Object.values(VISUAL_EFFECTS));

  // Generate variations
  const summary = await generateTemplateVariations(summaryTemplate, {
    role: context.role || 'professional',
    industry: context.industry || 'technology',
    years: context.years || '5',
    ...context,
  });

  const experiences = await Promise.all(
    experienceTemplates.map(template =>
      generateTemplateVariations(template, {
        project: context.project || 'key',
        result: Math.floor(Math.random() * 50) + 10,
        metric: context.metric || 'efficiency',
        ...context,
      })
    )
  );

  // Get random quote for inspiration
  const quote = await fetchFromAPI(FREE_APIS.quotes);
  const inspirationalQuote = quote?.content || '';

  return {
    style,
    layout: LAYOUT_TEMPLATES[style] || LAYOUT_TEMPLATES.SINGLE_COLUMN,
    colors: COLOR_SCHEMES[style] || COLOR_SCHEMES.PURPLE,
    fonts: FONT_COMBINATIONS[style] || FONT_COMBINATIONS.MODERN,
    backgroundImage,
    visualEffect,
    sections: {
      summary,
      experiences,
      skills: skillsCategories,
      quote: inspirationalQuote,
    },
  };
};

// Get available template styles
export const getTemplateStyles = () => Object.keys(TEMPLATE_STYLES);

// Get color schemes
export const getColorSchemes = () => COLOR_SCHEMES;

// Get font combinations
export const getFontCombinations = () => FONT_COMBINATIONS;

// Generate multiple templates
export const generateMultipleTemplates = async (
  count: number,
  context: Partial<ResumeData>
) => {
  const styles = Object.keys(TEMPLATE_STYLES) as Array<keyof typeof TEMPLATE_STYLES>;
  const templates = await Promise.all(
    Array(count)
      .fill(null)
      .map(() => generateResumeTemplate(getRandomItem(styles), context))
  );
  return templates;
};
