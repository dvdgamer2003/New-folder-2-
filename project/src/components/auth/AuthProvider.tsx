import { createContext, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { User, AuthError } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const retryOperation = async <T,>(
    operation: () => Promise<T>,
    retries = MAX_RETRIES
  ): Promise<T> => {
    try {
      return await operation();
    } catch (error) {
      if (retries > 0 && (error as AuthError).__isAuthError) {
        await sleep(RETRY_DELAY);
        return retryOperation(operation, retries - 1);
      }
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    return retryOperation(() => 
      supabase.auth.signInWithPassword({ email, password })
    );
  };

  const signUp = async (email: string, password: string) => {
    return retryOperation(() =>
      supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/signin`
        }
      })
    );
  };

  const signOut = async () => {
    return retryOperation(async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}