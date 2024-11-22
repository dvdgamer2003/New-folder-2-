import { Sparkles, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 text-white mb-4">
              <Sparkles className="w-8 h-8" />
              <span className="text-2xl font-bold">BuildDivine</span>
            </div>
            <p className="text-sm">
              Create divine resumes that help you land your dream job.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Resume Tips
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Career Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Examples
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>© {new Date().getFullYear()} BuildDivine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}