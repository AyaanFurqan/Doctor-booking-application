import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const AdminContext = createContext()



const AdminContextProvider = (props) => {
    
    const [atoken, setAtoken] = useState(false)
    const backendurl = import.meta.env.VITE_BACKENDURL
    const checkauth = async() => {
        const { data } = await axios.get(backendurl + 'api/admin/check-auth', {withCredentials:true})
        if (data.success) {
            setAtoken(true)
        }
    }
    useEffect(() => {
            checkauth()
        }, [])
    const value = {
        atoken, setAtoken,
        backendurl,

    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider