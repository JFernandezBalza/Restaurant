/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios"
import {createContext, useMemo, useState} from "react"

export const UsersContext= createContext({
    user: "",
    userAppointments: [],
    loginUser: async () => {},
    registerUser: async () => {},
    logOutUser: () => {},
    getUserAppointments: async () => {},
    cancelAppointment: async () => {},
    createAppointment: async () => {},
})

export const UsersProvider= ( {children} ) => {

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

    const getUserAppointments = async (userId) => {
       const respGetAppo= await axios.get(`http://localhost:3000/users/${userId}`)
       setUserAppointments(respGetAppo.data.appointments)
    }

    const cancelAppointment= async (appointmentId) => {
        await axios.put(`http://localhost:3000/appointments/cancel/${appointmentId}`)
        
        const userAppointmentsUpdate= userAppointments.map(appointment => {
            if(appointment.id === appointmentId){
                const appointmentUpdate= {...appointment, status: "cancelled"}
                return appointmentUpdate
            }else return appointment
        })
        setUserAppointments(userAppointmentsUpdate)
    }

    const createAppointment= async (values) => {

        const appointmentsValues= {
            ...values,
            userId: user
        }

        await axios.post("http://localhost:3000/appointments/schedule", appointmentsValues)

    }

    const value= useMemo(()=> ({

        user,
        userAppointments,
        loginUser,
        registerUser,
        logOutUser,
        getUserAppointments,
        cancelAppointment,
        createAppointment

    }), [user, userAppointments])


    return(
        <UsersContext.Provider value= {value}>
            {children}
        </UsersContext.Provider> 
    )

}