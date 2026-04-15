import { createContext, useState } from "react";
import axios from 'axios'
import { useEffect } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const backendurl = import.meta.env.VITE_BACKENDURL
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(false)

    // Function to get all doctors
    const getalldoctors = async () => {
        try {
            const { data } = await axios.get(backendurl + 'api/doctor/list')
            console.log(data)
            if (data.success) {
                setDoctors(data.doctors)
            }
        } catch (error) {
            console.log(error.message)
        }

    }

    // User token authentication to check if its already login
    const checkalreadylogin = async () => {
        try {
            const { data } = await axios.get(backendurl + 'api/user/userauth')
            if (data.success) {
                setToken(true)
            }
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        checkalreadylogin()
    }, [])


    const currencysymbol = '$'

    const value = {
        doctors,
        getalldoctors,
        currencysymbol,
        backendurl,
        token, setToken
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )


}

export default AppContextProvider