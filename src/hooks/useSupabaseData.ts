import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

// ---- Missions with steps ----
export interface MissionWithSteps {
  id: string;
  title: string;
  description: string | null;
  mission_type: string;
  reward_type: string;
  reward_value: number;
  icon: string;
  starts_at: string;
  ends_at: string;
  active: boolean;
  steps: {
    id: string;
    description: string;
    type: string;
    target_count: number;
    step_order: number;
  }[];
  userProgress?: {
    status: string;
    progress: Record<string, number> | null;
  };
}

export function useMissions() {
  const { user } = useAuth();
  const [missions, setMissions] = useState<MissionWithSteps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data: missionsData } = await supabase
        .from('missions')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (!missionsData) { setLoading(false); return; }

      const missionIds = missionsData.map(m => m.id);
      const { data: stepsData } = await supabase
        .from('mission_steps')
        .select('*')
        .in('mission_id', missionIds)
        .order('step_order');

      let userMissions: any[] = [];
      if (user) {
        const { data } = await supabase
          .from('user_missions')
          .select('*')
          .eq('user_id', user.id)
          .in('mission_id', missionIds);
        userMissions = data || [];
      }

      const result: MissionWithSteps[] = missionsData.map(m => {
        const steps = (stepsData || []).filter(s => s.mission_id === m.id);
        const up = userMissions.find(um => um.mission_id === m.id);
        return {
          ...m,
          steps,
          userProgress: up ? { status: up.status, progress: up.progress as Record<string, number> | null } : undefined,
        };
      });

      setMissions(result);
      setLoading(false);
    };
    fetch();
  }, [user]);

  return { missions, loading };
}

// ---- Drops (pharmacy drops + influencer drops) ----
export interface DropWithDetails {
  id: string;
  title: string;
  description: string | null;
  type: string;
  quantity: number;
  expires_at: string | null;
  active: boolean;
  product: { id: string; name: string; image_url: string | null; category: string; rarity: string; price: number | null } | null;
  pharmacy: { id: string; name: string; address: string } | null;
}

export interface InfluencerDropWithDetails {
  id: string;
  title: string;
  description: string | null;
  type: string;
  total_quantity: number;
  remaining_quantity: number;
  expires_at: string;
  discount_percent: number | null;
  teaser_message: string | null;
  lat: number;
  lng: number;
  influencer_id: string;
  influencer_name: string;
  product: { id: string; name: string; image_url: string | null } | null;
}

export function useDrops() {
  const [drops, setDrops] = useState<DropWithDetails[]>([]);
  const [influencerDrops, setInfluencerDrops] = useState<InfluencerDropWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      // Pharmacy drops
      const { data: dropsData } = await supabase
        .from('drops')
        .select('*, products(*), pharmacies(*)')
        .eq('active', true);

      if (dropsData) {
        setDrops(dropsData.map(d => ({
          id: d.id,
          title: d.title,
          description: d.description,
          type: d.type,
          quantity: d.quantity,
          expires_at: d.expires_at,
          active: d.active,
          product: d.products ? {
            id: d.products.id,
            name: d.products.name,
            image_url: d.products.image_url,
            category: d.products.category,
            rarity: d.products.rarity,
            price: d.products.price,
          } : null,
          pharmacy: d.pharmacies ? {
            id: d.pharmacies.id,
            name: d.pharmacies.name,
            address: d.pharmacies.address,
          } : null,
        })));
      }

      // Influencer drops
      const { data: infDropsData } = await supabase
        .from('influencer_drops')
        .select('*, products(*)')
        .eq('active', true);

      if (infDropsData) {
        // Get influencer names from profiles
        const influencerIds = [...new Set(infDropsData.map(d => d.influencer_id))];
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, username')
          .in('id', influencerIds);

        const profileMap = new Map((profiles || []).map(p => [p.id, p.username || 'Influenciador']));

        setInfluencerDrops(infDropsData.map(d => ({
          id: d.id,
          title: d.title,
          description: d.description,
          type: d.type,
          total_quantity: d.total_quantity,
          remaining_quantity: d.remaining_quantity,
          expires_at: d.expires_at,
          discount_percent: d.discount_percent,
          teaser_message: d.teaser_message,
          lat: d.lat,
          lng: d.lng,
          influencer_id: d.influencer_id,
          influencer_name: profileMap.get(d.influencer_id) || 'Influenciador',
          product: d.products ? {
            id: d.products.id,
            name: d.products.name,
            image_url: d.products.image_url,
          } : null,
        })));
      }

      setLoading(false);
    };
    fetch();
  }, []);

  return { drops, influencerDrops, loading };
}

// ---- Leaderboard ----
export interface LeaderboardEntry {
  id: string;
  username: string | null;
  avatar_url: string | null;
  level: number;
  total_points: number;
  xp: number;
}

export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, level, total_points, xp')
        .order('total_points', { ascending: false })
        .limit(50);
      setEntries(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return { entries, loading };
}

// ---- Scan History ----
export interface ScanEntry {
  id: string;
  scanned_at: string;
  points_earned: number;
  product: { name: string; image_url: string | null } | null;
  pharmacy: { name: string } | null;
}

export function useScanHistory() {
  const { user } = useAuth();
  const [scans, setScans] = useState<ScanEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const fetch = async () => {
      const { data } = await supabase
        .from('qr_scans')
        .select('*, products(*), pharmacies(*)')
        .eq('user_id', user.id)
        .order('scanned_at', { ascending: false })
        .limit(50);

      setScans((data || []).map(s => ({
        id: s.id,
        scanned_at: s.scanned_at,
        points_earned: s.points_earned,
        product: s.products ? { name: s.products.name, image_url: s.products.image_url } : null,
        pharmacy: s.pharmacies ? { name: s.pharmacies.name } : null,
      })));
      setLoading(false);
    };
    fetch();
  }, [user]);

  return { scans, loading };
}

// ---- User Badges ----
export function useUserBadges() {
  const { user } = useAuth();
  const [badges, setBadges] = useState<{ id: string; badge_name: string; badge_icon: string; earned_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const fetch = async () => {
      const { data } = await supabase
        .from('user_badges')
        .select('*')
        .eq('user_id', user.id);
      setBadges(data || []);
      setLoading(false);
    };
    fetch();
  }, [user]);

  return { badges, loading };
}

// ---- Social: Follow counts ----
export function useFollowCounts() {
  const { user } = useAuth();
  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { count: fwing } = await supabase
        .from('user_follows')
        .select('*', { count: 'exact', head: true })
        .eq('follower_id', user.id);
      const { count: fwers } = await supabase
        .from('user_follows')
        .select('*', { count: 'exact', head: true })
        .eq('following_id', user.id);
      setFollowing(fwing || 0);
      setFollowers(fwers || 0);
    };
    fetch();
  }, [user]);

  return { following, followers };
}

// ---- Activity Feed ----
export interface ActivityEntry {
  id: string;
  title: string;
  description: string | null;
  type: string;
  created_at: string;
  user_id: string;
}

export function useActivityFeed() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const fetch = async () => {
      const { data } = await supabase
        .from('activity_feed')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(30);
      setActivities(data || []);
      setLoading(false);
    };
    fetch();
  }, [user]);

  return { activities, loading };
}

// ---- Admin Stats ----
export function useAdminStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMissions: 0,
    totalScans: 0,
    totalDropsClaimed: 0,
  });
  const [profiles, setProfiles] = useState<any[]>([]);
  const [drops, setDrops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const [
        { count: usersCount },
        { count: missionsCount },
        { count: scansCount },
        { count: claimsCount },
        { data: profilesData },
        { data: dropsData },
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('user_missions').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
        supabase.from('qr_scans').select('*', { count: 'exact', head: true }),
        supabase.from('drop_claims').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('id, username, avatar_url, level, total_points, xp, created_at').order('created_at', { ascending: false }).limit(100),
        supabase.from('drops').select('*, products(*), pharmacies(*)').eq('active', true),
      ]);

      setStats({
        totalUsers: usersCount || 0,
        totalMissions: missionsCount || 0,
        totalScans: scansCount || 0,
        totalDropsClaimed: claimsCount || 0,
      });
      setProfiles(profilesData || []);
      setDrops(dropsData || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return { stats, profiles, drops, loading };
}

// ---- Products from DB ----
export function useProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      setProducts(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return { products, loading };
}
