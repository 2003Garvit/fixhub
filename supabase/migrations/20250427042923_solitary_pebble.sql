/*
  # Initial Schema Setup for FixHub

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique)
      - `created_at` (timestamp with time zone)
    - `repairers`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `skills` (text array)
      - `repairer_type` (text)
      - `contact_method` (text)
      - `description` (text)
      - `location` (text)
      - `created_at` (timestamp with time zone)
    - `repair_requests`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `item_to_repair` (text)
      - `skill_needed` (text)
      - `description` (text)
      - `location` (text)
      - `status` (text)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  username text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create repairers table
CREATE TABLE IF NOT EXISTS repairers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  skills text[] NOT NULL,
  repairer_type text NOT NULL,
  contact_method text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create repair_requests table
CREATE TABLE IF NOT EXISTS repair_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  item_to_repair text NOT NULL,
  skill_needed text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  status text DEFAULT 'open',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE repairers ENABLE ROW LEVEL SECURITY;
ALTER TABLE repair_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Repairer policies
CREATE POLICY "Repairers are viewable by everyone"
  ON repairers FOR SELECT
  USING (true);

CREATE POLICY "Users can create their repairer profile"
  ON repairers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own repairer profile"
  ON repairers FOR UPDATE
  USING (auth.uid() = user_id);

-- Repair request policies
CREATE POLICY "Repair requests are viewable by everyone"
  ON repair_requests FOR SELECT
  USING (true);

CREATE POLICY "Users can create repair requests"
  ON repair_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own repair requests"
  ON repair_requests FOR UPDATE
  USING (auth.uid() = user_id);