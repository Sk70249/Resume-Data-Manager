/*
  # Initial schema setup for Resume Handler

  1. New Tables
    - `groups`
      - `id` (uuid, primary key)
      - `name` (text)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp with time zone)
    
    - `resume_entries`
      - `id` (uuid, primary key)
      - `content` (text)
      - `user_id` (uuid, references auth.users)
      - `group_id` (uuid, references groups)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

-- Create groups table
CREATE TABLE IF NOT EXISTS groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create resume_entries table
CREATE TABLE IF NOT EXISTS resume_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  group_id uuid REFERENCES groups(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for groups
CREATE POLICY "Users can manage their own groups"
  ON groups
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for resume_entries
CREATE POLICY "Users can manage their own resume entries"
  ON resume_entries
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);