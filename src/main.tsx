import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App'
import Database from './Database/Database'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }, 
  {
    path: '/database',
    element: <Database />
  }, 
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
