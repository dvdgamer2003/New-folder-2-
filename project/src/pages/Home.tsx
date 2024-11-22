import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Mail, PenTool, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=2560&q=80")',
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 py-32 text-center text-white">
          <h1 className="text-5xl font-bold mb-6">
            Build Your Professional Resume
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Create stunning resumes, cover letters, and professional emails with our AI-powered tools.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/builder"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Resume Builder */}
            <Link to="/builder" className="group">
              <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all">
                <FileText className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Resume Builder
                </h3>
                <p className="text-muted-foreground">
                  Create professional resumes with our easy-to-use builder. Choose from multiple templates.
                </p>
              </div>
            </Link>

            {/* Cover Letter */}
            <Link to="/cover-letter" className="group">
              <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all">
                <PenTool className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Cover Letter
                </h3>
                <p className="text-muted-foreground">
                  Write compelling cover letters that complement your resume perfectly.
                </p>
              </div>
            </Link>

            {/* Professional Email */}
            <Link to="/email" className="group">
              <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all">
                <Mail className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Professional Email
                </h3>
                <p className="text-muted-foreground">
                  Generate professional emails for job applications and follow-ups.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <Star className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Career?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start creating your professional resume today and take the next step in your career journey.
          </p>
          <Link
            to="/builder"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
          >
            Start Building
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}