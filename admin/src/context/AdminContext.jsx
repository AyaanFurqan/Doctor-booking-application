import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AdminContext = createContext()



const AdminContextProvider = (props) => {

    const [atoken, setAtoken] = useState(false)
    const backendurl = import.meta.env.VITE_BACKENDURL
    const [doctors, setDoctors] = useState([])


    // to check admin is login
    const checkauth = async () => {
        const { data } = await axios.get(backendurl + 'api/admin/check-auth', { withCredentials: true })
        if (data.success) {
            setAtoken(true)
        }
    }

    // to get all doctors
    const getalldoctors = async () => {
        try {
            const { data } = await axios.get(backendurl + 'api/admin/all-doctors', { withCredentials: true })
            if (data.success) {
                setDoctors(data.doctors)
            }
        } catch (error) {
            toast.error(data.message)
        }

    }

    // to change doctors availiblity
    const changeavailiblity = async (docId) => {
        try {
            const { data } = await axios.post(backendurl + 'api/admin/change-availiblity', {docId}, { withCredentials: true })
            if(data.success){
             toast.success(data.message)
             getalldoctors()
            }
        } catch (error) {

        }

    }

    // to run checkauth everytime page reloads
    useEffect(() => {
        checkauth()
    }, [])

    // values we can access from whole application
    const value = {
        atoken, setAtoken,
        backendurl, getalldoctors,
        doctors, changeavailiblity

    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider