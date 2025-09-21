import React from 'react';

function MinimalApp() {
  return (
    <div style={{ 
      padding: '40px', 
      textAlign: 'center', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>
        🎉 React App is Working!
      </h1>
      <p style={{ color: '#666', marginBottom: '30px', fontSize: '18px' }}>
        The development server is running successfully.
      </p>
      <button 
        onClick={() => alert('Button works!')}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Test Button
      </button>
      <div style={{ marginTop: '30px', color: '#888' }}>
        <p>If you can see this, React is mounting correctly!</p>
        <p>Time: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
}

export default MinimalApp;