import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardRoute from './DashboardRoute';
import PrivateRoters from './PrivateRoters';
import PublicRouters from './PublicRouters';
import { Register } from '../components/Register';
import { Login } from '../components/Login';
import { guardarUsuarioStorage } from '../helpers/LocalStorage';

const AppRoutes = () => {
  const [checking, setChecking] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        guardarUsuarioStorage(user.displayName, user.email)
        console.log(user)
        setIsLoggedIn(true)
      }
      else {
        setIsLoggedIn(false)
      }
      setChecking(false)
    })
  }, [setIsLoggedIn, setChecking])

  if (checking) {
    return (
      <>
      <section className='pantallaCarga'>
        <h1>...</h1>
      </section>
      </>
    )
  }
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/login" element={
          <PublicRouters isAut={isLoggedIn}>
            <Login />
          </PublicRouters>} />

        <Route path="/register" element={
          <PublicRouters isAut={isLoggedIn}>
            <Register />
          </PublicRouters>
        } />

        <Route path="/*" element={<PrivateRoters isAut={isLoggedIn}>
          <DashboardRoute />
        </PrivateRoters>} />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes