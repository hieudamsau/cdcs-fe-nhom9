import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Home from '../src/page/adminpage/home/Home'


const PrivateRoute = () => {
   const isAuthenticated = checkAuth()
   return isAuthenticated ? <RouteHome /> : <Navigate to="/" />
}

const RouteHome = () => {
   return (
      <>
         <Routes>
            <Route path="/admin" element={<Home />}></Route>
         </Routes>
         <Outlet />
      </>
   )
}
export default PrivateRoute
function checkAuth (){
    const user = JSON.parse(localStorage.getItem('user'))
    if (user?.email === undefined) {
       return false
    } else {
       return true
    }
}