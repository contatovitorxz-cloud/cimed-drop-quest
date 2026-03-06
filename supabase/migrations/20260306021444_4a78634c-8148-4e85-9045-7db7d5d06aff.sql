
-- Module 1: Missions
CREATE TABLE public.missions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  mission_type text NOT NULL DEFAULT 'weekly',
  reward_type text NOT NULL DEFAULT 'points',
  reward_value integer NOT NULL DEFAULT 100,
  icon text NOT NULL DEFAULT '🏆',
  starts_at timestamptz NOT NULL DEFAULT now(),
  ends_at timestamptz NOT NULL DEFAULT (now() + interval '7 days'),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.mission_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_id uuid REFERENCES public.missions(id) ON DELETE CASCADE NOT NULL,
  step_order integer NOT NULL DEFAULT 1,
  description text NOT NULL,
  type text NOT NULL DEFAULT 'visit_pharmacy',
  target_count integer NOT NULL DEFAULT 1,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.user_missions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mission_id uuid REFERENCES public.missions(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL DEFAULT 'active',
  progress jsonb DEFAULT '{}'::jsonb,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  UNIQUE(user_id, mission_id)
);

-- Module 2: QR Codes
CREATE TABLE public.qr_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pharmacy_id uuid REFERENCES public.pharmacies(id) ON DELETE SET NULL,
  code text UNIQUE NOT NULL,
  type text NOT NULL DEFAULT 'checkin',
  points_value integer NOT NULL DEFAULT 50,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz
);

CREATE TABLE public.qr_scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  qr_code_id uuid REFERENCES public.qr_codes(id) ON DELETE SET NULL,
  pharmacy_id uuid REFERENCES public.pharmacies(id) ON DELETE SET NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  points_earned integer NOT NULL DEFAULT 0,
  scanned_at timestamptz NOT NULL DEFAULT now(),
  location_lat double precision,
  location_lng double precision
);

-- Module 3: Influencer Drops
CREATE TABLE public.influencer_drops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  influencer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  radius_meters integer NOT NULL DEFAULT 500,
  total_quantity integer NOT NULL DEFAULT 10,
  remaining_quantity integer NOT NULL DEFAULT 10,
  type text NOT NULL DEFAULT 'free',
  discount_percent integer DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '24 hours'),
  teaser_message text
);

CREATE TABLE public.drop_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  drop_id uuid REFERENCES public.influencer_drops(id) ON DELETE CASCADE NOT NULL,
  claimed_at timestamptz NOT NULL DEFAULT now(),
  redeemed boolean NOT NULL DEFAULT false,
  redeemed_at timestamptz,
  UNIQUE(user_id, drop_id)
);

-- Module 4: Social
CREATE TABLE public.user_follows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  following_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(follower_id, following_id)
);

CREATE TABLE public.user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL DEFAULT 'badge_earned',
  title text NOT NULL,
  description text,
  metadata jsonb DEFAULT '{}'::jsonb,
  is_public boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.activity_feed (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  description text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS Policies
ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mission_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.influencer_drops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drop_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_feed ENABLE ROW LEVEL SECURITY;

-- Missions: public read
CREATE POLICY "Anyone can view active missions" ON public.missions FOR SELECT USING (active = true);
CREATE POLICY "Anyone can view mission steps" ON public.mission_steps FOR SELECT USING (true);
CREATE POLICY "Users can view own missions" ON public.user_missions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own missions" ON public.user_missions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own missions" ON public.user_missions FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- QR Codes: public read, scans own
CREATE POLICY "Anyone can view active qr codes" ON public.qr_codes FOR SELECT USING (active = true);
CREATE POLICY "Users can view own scans" ON public.qr_scans FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own scans" ON public.qr_scans FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Influencer Drops: public read active, claims own
CREATE POLICY "Anyone can view active influencer drops" ON public.influencer_drops FOR SELECT USING (active = true);
CREATE POLICY "Influencers can insert own drops" ON public.influencer_drops FOR INSERT TO authenticated WITH CHECK (auth.uid() = influencer_id);
CREATE POLICY "Influencers can update own drops" ON public.influencer_drops FOR UPDATE TO authenticated USING (auth.uid() = influencer_id);
CREATE POLICY "Users can view own claims" ON public.drop_claims FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own claims" ON public.drop_claims FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Social: follows visible, achievements public
CREATE POLICY "Users can view follows" ON public.user_follows FOR SELECT TO authenticated USING (auth.uid() = follower_id OR auth.uid() = following_id);
CREATE POLICY "Users can insert follows" ON public.user_follows FOR INSERT TO authenticated WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can delete follows" ON public.user_follows FOR DELETE TO authenticated USING (auth.uid() = follower_id);
CREATE POLICY "Anyone can view public achievements" ON public.user_achievements FOR SELECT USING (is_public = true);
CREATE POLICY "Users can insert own achievements" ON public.user_achievements FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own feed" ON public.activity_feed FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own feed" ON public.activity_feed FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
