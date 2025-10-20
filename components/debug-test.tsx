'use client';

import { useState } from 'react';

export function DebugTest() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    console.log(message);
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testBasicClick = () => {
    addLog('Basic click handler executed');
  };

  const testAlert = () => {
    addLog('Alert test clicked');
    try {
      alert('JavaScript is working!');
      addLog('Alert shown successfully');
    } catch (error) {
      addLog(`Alert failed: ${error}`);
    }
  };

  const testConsole = () => {
    addLog('Console test clicked');
    console.log('Console test executed');
    addLog('Console log executed');
  };

  return (
    <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-900">
      <h3 className="text-lg font-semibold mb-2">Debug Test</h3>
      <div className="space-y-2">
        <button 
          onClick={testBasicClick}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
        >
          Test Click
        </button>
        <button 
          onClick={testAlert}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
        >
          Test Alert
        </button>
        <button 
          onClick={testConsole}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Test Console
        </button>
        
        <div className="mt-4">
          <h4 className="font-semibold text-sm">Logs:</h4>
          <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs max-h-32 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-500">No logs yet. Click buttons to see logs.</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="text-gray-700 dark:text-gray-300">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
