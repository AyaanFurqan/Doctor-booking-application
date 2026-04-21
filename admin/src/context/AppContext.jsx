import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const agecalculate = (dob) => {
        const currentdate = new Date()
        const dateOfBirth = new Date(dob)
        const age = currentdate.getFullYear() - dateOfBirth.getFullYear()
        return age
    }
    const currency = 'PKR'
    const value = {
        agecalculate,
        currency
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider