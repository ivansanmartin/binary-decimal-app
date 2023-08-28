import React from 'react'
import {useAuth0} from "@auth0/auth0-react"
import {Navigate} from "react-router-dom"



function Index() {

    const {loginWithRedirect, isAuthenticated, isLoading, error} = useAuth0()

    if (isLoading) {
        return (
            <div className='d-flex container-fluid justify-content-center align-items-center vh-100'>
                <div className="spinner-border spinner-border-lg text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                 </div>
            </div>
  
        )
    }

    if (error) {
        return <div>Error</div>
    }

    if (isAuthenticated) {
        return <Navigate to={"/dashboard"} />

    }
  return (
    <header className='container-fluid d-flex justify-content-around mt-5'>
        <div className='logo'>
            <a href="/">Binary Decimal App</a>
        
        </div>

        <div className='nav'>
            <a href="" className=''>Características</a>
        </div>

        <div className='login-register'>
            {
                isAuthenticated ? <a href='/dashboard'>Dashboard</a> : 

                <a href="" className='' onClick={() => loginWithRedirect() }>Iniciar sesión →</a>
            }

            
        </div>

    </header>

  )
}

export default Index