import React from 'react';

// Simple test version of App to debug step by step
function SimpleApp() {
  console.log("SimpleApp is rendering...");
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Simple App Test</h1>
      <p>This is a basic app without any complex dependencies.</p>
      <a href="/login" style={{ marginRight: '10px', color: 'blue' }}>Login</a>
      <a href="/signup" style={{ color: 'blue' }}>Signup</a>
    </div>
  );
}

export default SimpleApp;