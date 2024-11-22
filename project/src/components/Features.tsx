import { Sparkles, Download, Layout, Clock, Zap, Lock } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="w-12 h-12 text-purple-500" />,
    title: 'Free AI Assistant',
    description: 'Get smart suggestions to improve your resume content, completely free.',
  },
  {
    icon: <Download className="w-12 h-12 text-purple-500" />,
    title: 'Easy Export',
    description: 'Download your resume in professional PDF format instantly.',
  },
  {
    icon: <Layout className="w-12 h-12 text-purple-500" />,
    title: 'Multiple Templates',
    description: 'Choose from our growing collection of ATS-friendly templates.',
  },
  {
    icon: <Clock className="w-12 h-12 text-purple-500" />,
    title: 'Quick & Easy',
    description: 'Create your perfect resume in minutes, not hours.',
  },
  {
    icon: <Zap className="w-12 h-12 text-purple-500" />,
    title: 'Real-time Preview',
    description: 'See changes instantly as you build your resume.',
  },
  {
    icon: <Lock className="w-12 h-12 text-purple-500" />,
    title: 'Privacy First',
    description: 'Your data stays on your device, always private and secure.',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose BuildDivine?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}