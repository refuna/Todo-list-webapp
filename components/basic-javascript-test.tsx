'use client';

export function BasicJavaScriptTest() {
  const handleClick = () => {
    console.log('Basic JavaScript test clicked!');
    alert('JavaScript is working!');
  };

  return (
    <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900">
      <h3 className="text-lg font-semibold mb-2">Basic JavaScript Test</h3>
      <div className="space-y-2">
        <p className="text-sm">This test uses basic JavaScript (no React state)</p>
        <button 
          onClick={handleClick}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test Basic JS
        </button>
        <p className="text-xs text-gray-600">Should show an alert if JS works</p>
      </div>
    </div>
  );
}
