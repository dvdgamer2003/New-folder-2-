import { Link, useNavigate } from 'react-router-dom';
import { FileText, Mail, PenTool, User, LogOut } from 'lucide-react';
import { ThemeToggle } from '../theme/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/signin');
  };

  const getInitials = (email: string) => {
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="mr-8 flex items-center space-x-2">
          <FileText className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">ResumeBuilder</span>
        </Link>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center space-x-6 text-sm font-medium">
            {user && (
              <>
                <Link
                  to="/builder"
                  className="flex items-center space-x-2 hover:text-primary"
                >
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline-block">Resume</span>
                </Link>
                <Link
                  to="/cover-letter"
                  className="flex items-center space-x-2 hover:text-primary"
                >
                  <PenTool className="h-4 w-4" />
                  <span className="hidden sm:inline-block">Cover Letter</span>
                </Link>
                <Link
                  to="/email"
                  className="flex items-center space-x-2 hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  <span className="hidden sm:inline-block">Email</span>
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{getInitials(user.email || '')}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => navigate('/signin')} variant="default">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}