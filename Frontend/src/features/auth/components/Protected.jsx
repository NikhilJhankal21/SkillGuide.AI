import { Navigate} from "react-router";
import { useAuth } from "../hooks/useAuth";
import React from 'react'

const Protected = ({children}) => {
    const {loading,user}=useAuth()
    if(loading){
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
              <div className="flex flex-col items-center p-8 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800 shadow-2xl">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-300 font-medium tracking-wide">Loading your workspace...</p>
              </div>
            </div>
        )
    }
    if(!user){
        return <Navigate to={'/login'}/>
    }
  return children
}

export default Protected