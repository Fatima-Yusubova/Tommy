import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { route } from './Router/router.jsx'

createRoot(document.getElementById('root')).render(
  <RouterProvider router={route}>
    <App/>
  </RouterProvider>
)
