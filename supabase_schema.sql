-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ENUMS
CREATE TYPE user_role AS ENUM ('admin', 'client', 'user');
CREATE TYPE project_status AS ENUM ('analysis', 'in_progress', 'delivered');
CREATE TYPE quote_status AS ENUM ('draft', 'submitted', 'abandoned', 'accepted');
CREATE TYPE message_type AS ENUM ('chat', 'form', 'recado');
CREATE TYPE message_status AS ENUM ('new', 'read', 'replied');
CREATE TYPE meeting_type AS ENUM ('online', 'office', 'other');
CREATE TYPE meeting_status AS ENUM ('pending', 'approved', 'declined');

-- PROFILES (Extends Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  role user_role DEFAULT 'user',
  phone TEXT,
  company TEXT,
  preferences JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PROJECTS
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status project_status DEFAULT 'analysis',
  description TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SERVICES (Catalog)
CREATE TABLE services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name_pt TEXT NOT NULL,
  name_en TEXT,
  name_fr TEXT,
  category TEXT NOT NULL,
  description_pt TEXT,
  tags TEXT[],
  price_range_internal TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

-- QUOTES
CREATE TABLE quotes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  guest_info JSONB, -- { name, email, phone, company }
  items JSONB NOT NULL, -- Array of cart items
  status quote_status DEFAULT 'draft',
  total_complexity_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- MESSAGES (Recados/Chat logs)
CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  type message_type DEFAULT 'recado',
  content TEXT NOT NULL,
  status message_status DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- MEETINGS
CREATE TABLE meetings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  guest_info JSONB, -- { name, email, phone }
  type meeting_type DEFAULT 'online',
  status meeting_status DEFAULT 'pending',
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  location_details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- POSTS (Blog)
CREATE TABLE posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title_pt TEXT NOT NULL,
  content_pt TEXT NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  cover_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CHATBOT MEMORIES
CREATE TABLE chatbot_memories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  confidence FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS POLICIES (Examples - Needs refinement based on exact auth flow)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can do everything on projects" ON projects FOR ALL USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));
CREATE POLICY "Clients can view own projects" ON projects FOR SELECT USING (auth.uid() = client_id);

-- STORAGE BUCKETS (Script to be run in Supabase SQL Editor or via API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('client-files', 'client-files', false);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('public-assets', 'public-assets', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', true);
