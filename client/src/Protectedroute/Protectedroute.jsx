import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Protectedroute = ({children})=>{
    const { user } = useContext(AuthContext)

    if(!user){
      return  <Navigate to={'/login'}/>
    }else{
        return children
    }
}

export default Protectedroute