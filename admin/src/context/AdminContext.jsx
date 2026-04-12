import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AdminContext = createContext()



const AdminContextProvider = (props) => {

    const [atoken, setAtoken] = useState(false)
    const backendurl = import.meta.env.VITE_BACKENDURL
    const [doctors, setDoctors] = useState([])

    

    const checkauth = async () => {
        const { data } = await axios.get(backendurl + 'api/admin/check-auth', { withCredentials: true })
        if (data.success) {
            setAtoken(true)
        }
    }
    
    const getalldoctors = async () => {
        try {
            const {data} = await axios.get(backendurl + 'api/admin/all-doctors', { withCredentials: true })
           if(data.success){
            setDoctors(data.doctors)
            console.log(data.doctors)
           }
        } catch (error) {
            toast.error(data.message)
        }

    }

    useEffect(() => {
        checkauth()
    }, [])

    const value = {
        atoken, setAtoken,
        backendurl, getalldoctors,
        doctors,

    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider