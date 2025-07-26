import { createRoot } from 'react-dom/client'
import './index.css'
import { route } from './Router/router.jsx'
import { RouterProvider } from 'react-router/dom'

createRoot(document.getElementById('root')).render(
 <RouterProvider router={route}/>

)
