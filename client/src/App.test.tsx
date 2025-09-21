import React from 'react';

function TestApp() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>React App is Working!</h1>
      <p>If you can see this, the basic React setup is functioning correctly.</p>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => alert('Button clicked!')}>Test Button</button>
      </div>
    </div>
  );
}

export default TestApp;