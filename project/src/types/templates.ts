import { TEMPLATE_STYLES, COLOR_SCHEMES, FONT_COMBINATIONS, VISUAL_EFFECTS } from '../services/templates';

export type TemplateStyle = keyof typeof TEMPLATE_STYLES;
export type ColorScheme = typeof COLOR_SCHEMES[keyof typeof COLOR_SCHEMES];
export type FontCombination = typeof FONT_COMBINATIONS[keyof typeof FONT_COMBINATIONS];

export type VisualEffect = typeof VISUAL_EFFECTS[keyof typeof VISUAL_EFFECTS] & {
  type: 'gradient' | 'mesh' | 'dots' | 'lines' | 'waves';
  opacity: number;
};

export interface LayoutSection {
  id: string;
  name: string;
  sections: (string | string[])[];
  className: string;
}

export interface ResumeTemplate {
  style: TemplateStyle;
  layout: LayoutSection;
  colors: ColorScheme;
  fonts: FontCombination;
  backgroundImage?: string;
  visualEffect?: VisualEffect;
  sections: {
    summary: string;
    experiences: string[];
    skills: string[];
    quote?: string;
  };
}

export interface ResumeData {
  role?: string;
  industry?: string;
  years?: string;
  project?: string;
  metric?: string;
  [key: string]: any;
}
