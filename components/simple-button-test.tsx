'use client';

import { useState, useEffect } from 'react';

export function SimpleButtonTest() {
  const [clicked, setClicked] = useState(false);
  const [jsWorking, setJsWorking] = useState(false);

  useEffect(() => {
    console.log('SimpleButtonTest component mounted');
    setJsWorking(true);
  }, []);

  const handleClick = () => {
    console.log('Simple button clicked!');
    setClicked(true);
  };

  return (
    <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900">
      <h3 className="text-lg font-semibold mb-2">Simple Button Test</h3>
      <div className="space-y-2">
        <p className="text-sm">JavaScript Working: {jsWorking ? 'Yes!' : 'No'}</p>
        <button 
          onClick={handleClick}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Click Me
        </button>
        <p className="text-sm">Clicked: {clicked ? 'Yes!' : 'No'}</p>
        <p className="text-xs text-gray-600">Check browser console for logs</p>
      </div>
    </div>
  );
}