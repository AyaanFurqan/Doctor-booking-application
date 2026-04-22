import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AdminContext = createContext()



const AdminContextProvider = (props) => {

    const [atoken, setAtoken] = useState(false)
    const backendurl = import.meta.env.VITE_BACKENDURL
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState([])


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
            const { data } = await axios.post(backendurl + 'api/admin/change-availiblity', { docId }, { withCredentials: true })
            if (data.success) {
                toast.success(data.message)
                getalldoctors()
            }
        } catch (error) {

        }

    }

    // to get all appointments
    const allappointments = async () => {
        const { data } = await axios.get(backendurl + 'api/admin/all-appointments', { withCredentials: true })
        try {
            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const cancelappointment = async (appointmentid) => {
        try {
            const { data } = await axios.post(backendurl + 'api/admin/cancel-appointment', { appointmentid }, { withCredentials: true })
            if (data.success) {
                toast.success(data.message)
                allappointments()
                dashboardData()
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Dashboard Data 
    const dashboardData = async () => {
        try {
            const { data } = await axios.get(backendurl + 'api/admin/admin-dashboard', { withCredentials: true })
            console.log(data)
            if (data.success) {
                setDashData(data.dashData)
                console.log(data)
            }

        }
        catch (error) {
            console.log(error)
        }
    }

    //   to run allappointments function everytime page reload
    useEffect(() => {
        allappointments()
    }, [atoken])

    // to run checkauth everytime page reloads
    useEffect(() => {
        checkauth()
    }, [atoken])

    useEffect(() => {
        dashboardData()
    }, [atoken])

    // values we can access from whole application
    const value = {
        atoken, setAtoken,
        backendurl, getalldoctors,
        doctors, changeavailiblity,
        allappointments, appointments,
        setAppointments, cancelappointment,
        dashData,

    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider