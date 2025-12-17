import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export type AppRole = 'super_admin' | 'admin';

interface AdminAuthState {
  user: User | null;
  session: Session | null;
  role: AppRole | null;
  loading: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
}

export function useAdminAuth() {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    session: null,
    role: null,
    loading: true,
    isSuperAdmin: false,
    isAdmin: false,
  });

  const fetchUserRole = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user role:', error);
      return null;
    }

    return data?.role as AppRole | null;
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setState(prev => ({
          ...prev,
          session,
          user: session?.user ?? null,
        }));

        if (session?.user) {
          setTimeout(async () => {
            const role = await fetchUserRole(session.user.id);
            setState(prev => ({
              ...prev,
              role,
              isSuperAdmin: role === 'super_admin',
              isAdmin: role === 'super_admin' || role === 'admin',
              loading: false,
            }));
          }, 0);
        } else {
          setState(prev => ({
            ...prev,
            role: null,
            isSuperAdmin: false,
            isAdmin: false,
            loading: false,
          }));
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
      }));

      if (session?.user) {
        fetchUserRole(session.user.id).then(role => {
          setState(prev => ({
            ...prev,
            role,
            isSuperAdmin: role === 'super_admin',
            isAdmin: role === 'super_admin' || role === 'admin',
            loading: false,
          }));
        });
      } else {
        setState(prev => ({ ...prev, loading: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchUserRole]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/admin`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl }
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    ...state,
    signIn,
    signUp,
    signOut,
  };
}
