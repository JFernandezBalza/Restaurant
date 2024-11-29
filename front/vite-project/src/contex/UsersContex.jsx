/* eslint-disable react-refresh/only-export-components */
import axios from "axios"
import {createContext, useState} from "react"

export const UsersContext= createContext({
    user: "",
    userApponent: [],
    loginUser: async () => {},
    registerUser: async () => {},
    logOutUser: () => {}
})


export const UsersProvider= ({children}) => {

    const [user, setUser]= useState(localStorage.getItem("userId") || "")
    const [userAppointments, setUserAppointments]= useState([])



    const loginUser= async (userData) =>{
        const respLogin= await axios.post("http://localhost:3000/users/login", userData)
        localStorage.setItem("userId", respLogin.data.user.id)
        setUser(respLogin.data.user.id)
    }


    const registerUser= async (userData)=> {
        await axios.post("http://localhost:3000/users/register", userData)
    }

    const logOutUser = () => {
        localStorage.clear()
        setUser("")
        setUserAppointments([])
    }




    const value= {
        user,
        userAppointments,
        loginUser,
        registerUser,
        logOutUser
    }






    return(
        <UsersContext.Provider value= {value}>
            {children}
        </UsersContext.Provider> 
    )

}