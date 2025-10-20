-- Create todos table for the Supabase todo app
-- Run this SQL in your Supabase dashboard > SQL Editor

-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for all users (for testing)
-- In production, you should restrict this to authenticated users only
CREATE POLICY "Allow all operations for all users" ON todos
  FOR ALL USING (true);

-- Create an index on created_at for better performance
CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at DESC);

-- Insert some sample data (optional)
INSERT INTO todos (title, priority, completed) VALUES 
  ('Welcome to TaskFlow!', 'high', false),
  ('Create your first task', 'medium', false),
  ('Mark tasks as complete', 'low', false);
