import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const agentBaseUrl = import.meta.env.VITE_AGENT_URL

window.OPEN_GRAVITY_CONFIG = {
  endpoint: agentBaseUrl
    ? `${agentBaseUrl.replace(/\/+$/, '')}/api/agent/chat`
    : 'http://localhost:3001/api/agent/chat'
}

void import('./chat-widget.js')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
