'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function SupabaseTest() {
  const [status, setStatus] = useState<string>('Testing...');
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    try {
      setStatus('Testing Supabase connection...');
      setError(null);

      // Test basic connection
      const { data, error } = await supabase
        .from('todos')
        .select('count')
        .limit(1);

      if (error) {
        setError(`Database error: ${error.message}`);
        setStatus('Connection failed');
      } else {
        setStatus('Connection successful!');
      }
    } catch (err) {
      setError(`Connection error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setStatus('Connection failed');
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Supabase Connection Test</h3>
      <button 
        onClick={testConnection}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test Connection
      </button>
      <div className="mt-2">
        <p className="text-sm">Status: {status}</p>
        {error && <p className="text-sm text-red-600">Error: {error}</p>}
      </div>
    </div>
  );
}
