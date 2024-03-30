import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'

const withAuthentication =(wrappedComponent)=>{
    return function AuthComponent(props){
        const [isAuthenticated,setIsAuthenticated]=useState(false)
        const navigate=useNavigate()
        useEffect(()=>{
            const token=localStorage.getItem('access')
            if (token){
                setIsAuthenticated(true)
            }else{
                setIsAuthenticated(false)
            }
        },[])

        if(isAuthenticated){
            return <wrappedComponent {...props}/>

        }else{
            return navigate('/login')
        }
    }
}


export default withAuthentication