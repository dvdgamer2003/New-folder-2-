import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2, RefreshCw } from 'lucide-react';
import { ResumeTemplate } from '../../types';
import { generateMultipleTemplates, TEMPLATE_STYLES, COLOR_SCHEMES, FONT_COMBINATIONS } from '../../services/templates';
import { useResumeStore } from '../../store/useResumeStore';

export default function TemplateSelector() {
  const [templates, setTemplates] = useState<ResumeTemplate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { resume } = useResumeStore();

  const currentTemplate = templates[currentIndex];

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const newTemplates = await generateMultipleTemplates(5, {
        role: resume.personalInfo.title || 'professional',
        industry: 'technology',
        years: '5',
      });
      setTemplates(newTemplates);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % templates.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + templates.length) % templates.length);
  };

  const handleStyleChange = (style: keyof typeof TEMPLATE_STYLES) => {
    if (!currentTemplate) return;
    
    const updatedTemplate = {
      ...currentTemplate,
      style,
      colors: COLOR_SCHEMES[style] || COLOR_SCHEMES.PURPLE,
      fonts: FONT_COMBINATIONS[style] || FONT_COMBINATIONS.MODERN,
    };

    setTemplates((prev) => {
      const newTemplates = [...prev];
      newTemplates[currentIndex] = updatedTemplate;
      return newTemplates;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500 mb-4">No templates available</p>
        <button
          onClick={loadTemplates}
          className="btn btn-primary"
        >
          Generate Templates
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Template Style Selector */}
      <div className="mb-8 flex justify-center space-x-4 flex-wrap gap-y-2">
        {Object.keys(TEMPLATE_STYLES).map((style) => (
          <button
            key={style}
            onClick={() => handleStyleChange(style as keyof typeof TEMPLATE_STYLES)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentTemplate?.style === style
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {style.charAt(0).toUpperCase() + style.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Template Preview</h3>
          <button
            onClick={loadTemplates}
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Generate New</span>
          </button>
        </div>

        {/* Template Preview */}
        <div className="relative bg-gray-50 rounded-lg overflow-hidden mb-6 min-h-[500px]">
          {/* Background Image */}
          {currentTemplate?.backgroundImage && (
            <div className="absolute inset-0">
              <img
                src={currentTemplate.backgroundImage}
                alt="Template background"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Visual Effect Overlay */}
              {currentTemplate.visualEffect && (
                <div
                  className={`absolute inset-0 ${
                    currentTemplate.visualEffect.type === 'gradient'
                      ? `bg-gradient-to-br ${currentTemplate.visualEffect.colors.join(' ')}`
                      : ''
                  }`}
                  style={{
                    opacity: currentTemplate.visualEffect.opacity || 0.1,
                    ...(currentTemplate.visualEffect.type === 'mesh' && {
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20v20H0V20h20zm20 0v20H20V20h20zM20 0v20H0V0h20zm20 0v20H20V0h20z' fill='%23000000' fill-opacity='0.05'/%3E%3C/svg%3E")`,
                    }),
                    ...(currentTemplate.visualEffect.type === 'dots' && {
                      backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
                      backgroundSize: '20px 20px',
                    }),
                    ...(currentTemplate.visualEffect.type === 'lines' && {
                      backgroundImage: `linear-gradient(90deg, currentColor 1px, transparent 1px)`,
                      backgroundSize: '20px 100%',
                    }),
                  }}
                />
              )}
            </div>
          )}

          <div className="relative p-6">
            {/* Navigation Buttons */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-2 z-10">
              <button
                onClick={handlePrevious}
                className="p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors"
                aria-label="Previous template"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors"
                aria-label="Next template"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Template Content */}
            <div className="space-y-6" style={{
              color: currentTemplate?.colors?.text || '#2D3748',
              backgroundColor: currentTemplate?.backgroundImage ? 'transparent' : (currentTemplate?.colors?.background || '#FFFFFF'),
            }}>
              {/* Header */}
              <div className="text-center backdrop-blur-sm bg-white/30 p-4 rounded-lg">
                <h2 className="text-2xl font-bold mb-2" style={{
                  color: currentTemplate?.colors?.primary || '#6B46C1',
                  fontFamily: currentTemplate?.fonts?.heading || 'Inter',
                }}>
                  {currentTemplate?.style?.charAt(0).toUpperCase() + currentTemplate?.style?.slice(1).toLowerCase()} Style
                </h2>
                <p className="text-sm opacity-75">
                  Template {currentIndex + 1} of {templates.length}
                </p>
              </div>

              {/* Sample Content */}
              <div className="space-y-6 backdrop-blur-sm bg-white/80 p-6 rounded-lg shadow-sm" style={{
                fontFamily: currentTemplate?.fonts?.body || 'Inter',
              }}>
                {/* Quote */}
                {currentTemplate?.sections?.quote && (
                  <div className="text-center italic text-sm opacity-75 mb-4">
                    "{currentTemplate.sections.quote}"
                  </div>
                )}

                {/* Summary */}
                <div className="prose prose-sm max-w-none">
                  <h3 className="font-semibold mb-2" style={{ color: currentTemplate?.colors?.secondary || '#9F7AEA' }}>
                    Professional Summary
                  </h3>
                  <p className="text-sm">{currentTemplate?.sections?.summary}</p>
                </div>

                {/* Experience */}
                <div className="prose prose-sm max-w-none">
                  <h3 className="font-semibold mb-2" style={{ color: currentTemplate?.colors?.secondary || '#9F7AEA' }}>
                    Sample Experience
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    {currentTemplate?.sections?.experiences?.slice(0, 2).map((exp, index) => (
                      <li key={index}>{exp}</li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: currentTemplate?.colors?.secondary || '#9F7AEA' }}>
                    Skills Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentTemplate?.sections?.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-xs"
                        style={{
                          backgroundColor: currentTemplate?.colors?.accent || '#B794F4',
                          color: currentTemplate?.colors?.background || '#FFFFFF',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Layout Preview */}
              <div className="backdrop-blur-sm bg-white/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2" style={{ color: currentTemplate?.colors?.secondary || '#9F7AEA' }}>
                  Layout: {currentTemplate?.layout?.name}
                </h4>
                <div className={`h-24 border-2 border-dashed grid gap-2 ${currentTemplate?.layout?.className}`} style={{
                  borderColor: currentTemplate?.colors?.accent || '#B794F4',
                }}>
                  {currentTemplate?.layout?.sections?.map((section, index) => (
                    <div
                      key={index}
                      className="bg-white/50 rounded"
                      style={{ height: Array.isArray(section) ? '100%' : 'auto' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Template Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Color Scheme */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium mb-3">Color Scheme</h3>
            <div className="flex gap-2">
              {currentTemplate?.colors && Object.entries(currentTemplate.colors).map(([name, color]) => (
                <div
                  key={name}
                  className="flex-1 h-8 rounded"
                  style={{ backgroundColor: color }}
                  title={`${name}: ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Font Preview */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium mb-3">Typography</h3>
            <div className="space-y-2">
              <p style={{ fontFamily: currentTemplate?.fonts?.heading }}>
                Heading Font: {currentTemplate?.fonts?.heading}
              </p>
              <p style={{ fontFamily: currentTemplate?.fonts?.body }}>
                Body Font: {currentTemplate?.fonts?.body}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={loadTemplates}
            className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            disabled={loading}
          >
            Generate More
          </button>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            disabled={loading || !currentTemplate}
          >
            Apply Template
          </button>
        </div>
      </div>
    </>
  );
}
