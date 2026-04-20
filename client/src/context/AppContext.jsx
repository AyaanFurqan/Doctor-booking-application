import { createContext, useState } from "react";
import axios from 'axios'
import { useEffect } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const backendurl = import.meta.env.VITE_BACKENDURL
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(false)
    const [userprofile, setUserprofile] = useState(false)

    // User token authentication to check if its already login
    const checkalreadylogin = async () => {
        try {
            const { data } = await axios.get(backendurl + 'api/user/userauth', { withCredentials: true })
            if (data.success) {
                setToken(true)
            } else {
                setToken(false)
            }
        } catch (error) {
            setToken(false)
            console.log(error)
        }

    }

    // API to get-profile
    const getprofile = async () => {
        try {
            const { data } = await axios.get(backendurl + 'api/user/get-profile', { withCredentials: true })
            if (data.success) {
                setUserprofile(data.userdata)
            }
        } catch (error) {
            console.log(error.message)
        }

    }


    // Function to get all doctors
    const getalldoctors = async () => {
        try {
            const { data } = await axios.get(backendurl + 'api/doctor/list')
            console.log(data)
            if (data.success) {
                setDoctors(data.doctors)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(()=>{
        getalldoctors()
    },[])

    // useEffect hook to run checkalready function everytime webpage gets reloads which checks if token is valid or not
    useEffect(() => {
        checkalreadylogin()
    }, [token])

    // if token is available then it will run getprofile function 
    useEffect(() => {
        if (token) {
            getprofile()
        }else{setUserprofile(false)}
    },[token])

    const currencysymbol = '$'

    const value = {
        doctors,
        getalldoctors,
        currencysymbol,
        backendurl,
        token, setToken,
        userprofile, setUserprofile,
        getprofile
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )


}

export default AppContextProvider