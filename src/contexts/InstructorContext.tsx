
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

interface InstructorProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  specialization?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

interface InstructorContextType {
  instructor: InstructorProfile | null;
  isInstructor: boolean;
  loading: boolean;
  refreshInstructor: () => Promise<void>;
}

const InstructorContext = createContext<InstructorContextType | undefined>(undefined);

export const useInstructor = () => {
  const context = useContext(InstructorContext);
  if (context === undefined) {
    throw new Error('useInstructor must be used within an InstructorProvider');
  }
  return context;
};

export const InstructorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [instructor, setInstructor] = useState<InstructorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInstructor, setIsInstructor] = useState(false);

  const fetchInstructorProfile = async () => {
    if (!user) {
      setInstructor(null);
      setIsInstructor(false);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('instructors')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching instructor profile:', error);
        toast({
          title: "Chyba při načítání",
          description: "Nepodařilo se načíst instruktorský profil",
          variant: "destructive",
        });
      } else if (data) {
        setInstructor(data);
        setIsInstructor(true);
      } else {
        setInstructor(null);
        setIsInstructor(false);
      }
    } catch (error) {
      console.error('Error fetching instructor profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshInstructor = async () => {
    await fetchInstructorProfile();
  };

  useEffect(() => {
    fetchInstructorProfile();
  }, [user]);

  const value = {
    instructor,
    isInstructor,
    loading,
    refreshInstructor,
  };

  return <InstructorContext.Provider value={value}>{children}</InstructorContext.Provider>;
};
