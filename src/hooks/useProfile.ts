import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface ProfileData {
  id: string;
  username: string | null;
  avatar_url: string | null;
  level: number;
  xp: number;
  total_points: number;
  created_at: string;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [ver, setVer] = useState(0);

  const refetch = () => setVer(v => v + 1);

  useEffect(() => {
    if (!user) { setProfile(null); setLoading(false); return; }

    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, [user, ver]);

  return { profile, loading, refetch };
}
