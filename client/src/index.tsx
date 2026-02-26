import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
declare interface WEBGL_debug_renderer_info {
  UNMASKED_RENDERER_WEBGL: number;
  UNMASKED_VENDOR_WEBGL: number;
}
