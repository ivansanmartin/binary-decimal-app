import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Root from './routes/Root.jsx'
import BinaryDecimal from './routes/BinaryDecimal.jsx'
import Index from './routes/Index.jsx'
import {Auth0Provider} from "@auth0/auth0-react"

const isAuthenticaded = true
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <h1>Pagina no encontrada</h1>,

  },

  {
    path: "/dashboard",
    element: <Root />,
    children: [
      {
        path: "/dashboard/binary-to-decimal",
        element: <BinaryDecimal />
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider 
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENTID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}

    >

      <RouterProvider router={router} />

    </Auth0Provider>
  </React.StrictMode>,
)
