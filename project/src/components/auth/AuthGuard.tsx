import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/signin');
      } else if (requireAdmin && !user.email?.endsWith('@admin.com')) {
        navigate('/');
      }
    }
  }, [user, loading, navigate, requireAdmin]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}