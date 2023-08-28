import React from 'react'
import {Link, Outlet} from "react-router-dom"
import {useAuth0} from "@auth0/auth0-react"

function Root() {

  const {logout, isAuthenticated} = useAuth0()
  return (
    isAuthenticated ? (
      <>
        <div className='container-fluid'>
            <ul>
                <li><Link to="/dashboard/binary-to-decimal">Ir</Link></li>
            </ul>
            <ul>
                <li><button onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}>Cerrar sesión</button></li>
            </ul>

        </div>

        <div id='detail' className='container-fluid'>
          <Outlet />
        </div>
  
    </>
    )
    :
    (
      <h1>Inicia sesión</h1>
    )

  )
}

export default Root