import React from 'react'
import { useAuth } from '../../store/AuthContext'
import { Navigate , useLocation} from 'react-router-dom'

const RequireAuth = ({ element }) => {
    const {user} = useAuth()
    const location = useLocation()
    console.log('User', user)
    if(!user){
      console.log('No user')
        return <Navigate  to="/login" replace state={{path:location.pathname}} />
    }
  return element
}

export default RequireAuth