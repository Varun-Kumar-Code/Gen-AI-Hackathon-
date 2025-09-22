import React from 'react';

// Step-by-step debug version to find which component is causing the issue
function DebugApp() {
  console.log("DebugApp is rendering...");
  
  try {
    // Test 1: Basic routing
    console.log("Testing basic imports...");
    
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>Debug App - Step by Step</h1>
        <p>✅ React is working</p>
        <p>✅ Basic component rendering works</p>
        
        <div style={{ marginTop: '20px' }}>
          <h2>Navigation Test:</h2>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <a href="/login" style={{ 
              padding: '8px 16px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              textDecoration: 'none',
              borderRadius: '4px'
            }}>
              Go to Login
            </a>
            <a href="/signup" style={{ 
              padding: '8px 16px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              textDecoration: 'none',
              borderRadius: '4px'
            }}>
              Go to Signup
            </a>
          </div>
        </div>
        
        <div style={{ marginTop: '30px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <p><strong>Next Step:</strong> We'll add components one by one to find the issue.</p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in DebugApp:", error);
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h1>Error in DebugApp</h1>
        <p>{error instanceof Error ? error.message : String(error)}</p>
      </div>
    );
  }
}

export default DebugApp;