import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import QuoteDisplay from './QuoteDisplay';

export default function Hero() {
  return (
    <div className="relative min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=2560&q=80")',
          zIndex: -2
        }}
      />
      <div 
        className="fixed inset-0 bg-gradient-to-b from-purple-900/75 to-purple-800/75"
        style={{ zIndex: -1 }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 p-4 rounded-full">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-white">
          Build Divine Resumes
        </h1>
        <p className="text-lg mb-8 text-gray-200 max-w-2xl mx-auto">
          Create stunning resumes with AI-powered suggestions. 
          Our free resume builder helps you craft the perfect resume in minutes.
        </p>
        <Link
          to="/builder"
          className="bg-white text-purple-600 px-6 py-3 rounded-lg text-lg font-medium hover:bg-purple-50 transition-colors inline-flex items-center justify-center space-x-2 shadow-md mb-12"
        >
          <span>Start Building Now</span>
          <ArrowRight size={20} />
        </Link>

        {/* Quote Display */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <QuoteDisplay />
        </div>
      </div>
    </div>
  );
}