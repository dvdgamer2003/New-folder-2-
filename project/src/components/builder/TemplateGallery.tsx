import { useTemplateStore } from '@/store/useTemplateStore';
import { CheckCircle, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

export function TemplateGallery() {
  const { templates, selectedTemplateId, selectedType, setSelectedTemplate } = useTemplateStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading of templates
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const relevantTemplates = templates.filter((t) => t.type === selectedType);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {relevantTemplates.map((template) => (
        <div
          key={template.id}
          className={`relative bg-card rounded-lg overflow-hidden border-2 transition-all cursor-pointer hover:shadow-lg ${
            selectedTemplateId === template.id
              ? 'border-primary shadow-primary/10'
              : 'border-transparent hover:border-primary/30'
          }`}
          onClick={() => setSelectedTemplate(template.id)}
        >
          {/* Preview Image */}
          <div className="aspect-[8.5/11] bg-muted">
            {loading ? (
              <div className="w-full h-full animate-pulse bg-muted" />
            ) : (
              <img
                src={template.previewUrl}
                alt={template.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Template Info */}
          <div className="p-4 space-y-2">
            <h3 className="font-semibold">{template.name}</h3>
            <p className="text-sm text-muted-foreground">{template.description}</p>
            
            {/* Features */}
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              {template.isATSFriendly && (
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>ATS-Friendly</span>
                </div>
              )}
            </div>

            {/* Selected Indicator */}
            {selectedTemplateId === template.id && (
              <div className="absolute top-2 right-2">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
