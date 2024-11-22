import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Home from '@/pages/Home';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Profile from '@/pages/Profile';
import { ResumeBuilder } from '@/components/builder/ResumeBuilder';
import { CoverLetter } from '@/components/cover-letter/CoverLetter';
import { EmailGenerator } from '@/components/email/EmailGenerator';
import { AIChatBot } from '@/components/chat/AIChatBot';
import AdminDashboard from '@/pages/admin/Dashboard';
import AuthGuard from '@/components/auth/AuthGuard';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen flex flex-col dark:bg-gray-950">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/signin" 
                element={user ? <Navigate to="/profile" /> : <SignIn />} 
              />
              <Route 
                path="/signup" 
                element={user ? <Navigate to="/profile" /> : <SignUp />} 
              />
              <Route 
                path="/profile" 
                element={
                  <AuthGuard>
                    <Profile />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/builder" 
                element={
                  <AuthGuard>
                    <ResumeBuilder />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/cover-letter" 
                element={
                  <AuthGuard>
                    <CoverLetter />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/email" 
                element={
                  <AuthGuard>
                    <EmailGenerator />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <AuthGuard requireAdmin>
                    <AdminDashboard />
                  </AuthGuard>
                } 
              />
            </Routes>
          </main>
          <Footer />
          <AIChatBot />
          <Toaster 
            position="top-right"
            toastOptions={{
              className: 'dark:bg-gray-800 dark:text-white',
              style: {
                background: 'var(--background)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
              },
            }} 
          />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;