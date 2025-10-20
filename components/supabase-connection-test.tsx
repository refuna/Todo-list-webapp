'use client';

import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';

export function SupabaseConnectionTest() {
  const [status, setStatus] = useState<string>('Not tested');
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    console.log('Test Connection button clicked!');
    try {
      setStatus('Testing...');
      setError(null);
      
      // Check environment variables first
      console.log('Environment check:');
      console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.log('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:', process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ? 'Present' : 'Missing');
      
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
        throw new Error('Missing Supabase environment variables');
      }
      
      console.log('Creating Supabase client...');
      const supabase = createClient();
      console.log('Supabase client created:', supabase);
      
      // Test basic connection
      console.log('Testing auth session...');
      const { data, error } = await supabase.auth.getSession();
      console.log('Session check result:', { data, error });
      
      if (error) {
        console.error('Auth error:', error);
        setError(`Auth error: ${error.message}`);
        setStatus('Connection failed');
      } else {
        console.log('Connection successful!');
        setStatus('Connection successful!');
      }
    } catch (err) {
      console.error('Connection test error:', err);
      setError(`Connection error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setStatus('Connection failed');
    }
  };

  const simpleTest = () => {
    console.log('Simple test clicked!');
    setStatus('Simple test worked!');
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
      <h3 className="text-lg font-semibold mb-2">Supabase Connection Test</h3>
      <div className="space-y-2">
        <button 
          onClick={() => {
            console.log('Button clicked - starting test...');
            testConnection();
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
        >
          Test Connection
        </button>
        <button 
          onClick={simpleTest}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Simple Test
        </button>
      </div>
      <div className="mt-2">
        <p className="text-sm">Status: {status}</p>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
