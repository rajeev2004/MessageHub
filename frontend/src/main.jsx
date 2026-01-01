import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter,HashRouter } from 'react-router'
createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>

)
