console.log('Application starting...');

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Error boundary for development
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          margin: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ color: '#e53e3e', marginBottom: '10px' }}>Something went wrong</h1>
          <p style={{ color: '#4a5568', marginBottom: '20px' }}>
            The application encountered an error. Please try refreshing the page.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <pre style={{
              whiteSpace: 'pre-wrap',
              backgroundColor: '#f7fafc',
              padding: '15px',
              borderRadius: '4px',
              color: '#2d3748',
              fontSize: '14px'
            }}>
              {this.state.error?.toString()}
              {'\n\n'}
              {this.state.errorInfo?.componentStack}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

// Initialize app with error handling
const initializeApp = () => {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Failed to find the root element. Make sure there is a <div id="root"></div> in your HTML.');
  }

  try {
    const root = createRoot(container);
    root.render(
      <ErrorBoundary>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('Failed to initialize the application:', error);
    container.innerHTML = `
      <div style="padding: 20px; color: #e53e3e;">
        <h1>Failed to start the application</h1>
        <p>Please try refreshing the page. If the problem persists, contact support.</p>
        ${process.env.NODE_ENV === 'development' ? `<pre>${error.stack}</pre>` : ''}
      </div>
    `;
  }
};

// Start the application
initializeApp(); 