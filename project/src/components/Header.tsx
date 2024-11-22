import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8" />
            <span className="text-2xl font-bold">BuildDivine</span>
          </Link>
          <nav>
            <Link to="/builder" className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
              Create Resume
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}