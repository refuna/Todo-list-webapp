'use client';

export function InlineStyleTest() {
  const handleClick = () => {
    console.log('Inline style button clicked!');
    alert('Inline style button works!');
  };

  return (
    <div style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f0f8ff' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Inline Style Test</h3>
      <p style={{ fontSize: '14px', marginBottom: '8px' }}>This button uses inline styles (no CSS classes)</p>
      <button 
        onClick={handleClick}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Inline Style Button
      </button>
      <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
        Should show alert if JavaScript works
      </p>
    </div>
  );
}
