import React from 'react';
import { Switch, Route } from "wouter";

// Simple Login Component without complex dependencies
function SimpleLogin() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '40px', 
        borderRadius: '8px', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Login</h2>
        <form>
          <div style={{ marginBottom: '20px' }}>
            <input 
              type="email" 
              placeholder="Email"
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input 
              type="password" 
              placeholder="Password"
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>
          <button 
            type="submit"
            style={{ 
              width: '100%', 
              padding: '12px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Don't have an account? <a href="/signup" style={{ color: '#007bff' }}>Sign up</a>
        </p>
      </div>
    </div>
  );
}

// Simple Signup Component
function SimpleSignup() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '40px', 
        borderRadius: '8px', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Sign Up</h2>
        <form>
          <div style={{ marginBottom: '20px' }}>
            <input 
              type="text" 
              placeholder="Full Name"
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input 
              type="email" 
              placeholder="Email"
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input 
              type="password" 
              placeholder="Password"
              style={{ 
                width: '100%', 
                padding: '12px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>
          <button 
            type="submit"
            style={{ 
              width: '100%', 
              padding: '12px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Sign Up
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Already have an account? <a href="/login" style={{ color: '#007bff' }}>Login</a>
        </p>
      </div>
    </div>
  );
}

// Simple Home Component
function SimpleHome() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Welcome Home!</h1>
      <p>You are successfully logged in.</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/login" style={{ marginRight: '10px', color: '#007bff' }}>Login</a>
        <a href="/signup" style={{ color: '#28a745' }}>Signup</a>
      </div>
    </div>
  );
}

// Simple App with working routing
function SimpleAuthApp() {
  console.log("SimpleAuthApp is rendering...");
  
  return (
    <Switch>
      <Route path="/login" component={SimpleLogin} />
      <Route path="/signup" component={SimpleSignup} />
      <Route path="/" component={SimpleHome} />
      <Route>
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h1>Page Not Found</h1>
          <a href="/" style={{ color: '#007bff' }}>Go Home</a>
        </div>
      </Route>
    </Switch>
  );
}

export default SimpleAuthApp;