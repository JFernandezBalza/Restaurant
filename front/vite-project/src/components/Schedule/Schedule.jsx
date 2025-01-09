import { useFormik } from "formik"
import { dateFormValidate } from "../../helpers/dateFormValidate"
import Swal from "sweetalert2"
import { UsersContext } from "../../contex/UsersContex"
import { useContext } from "react"
import styles from "./Schedule.module.css"


const Schedule= () => {

    const {createAppointment} = useContext(UsersContext)

    const formik= useFormik({
        initialValues:{
            date: "",
            time: ""
        },
        validate: dateFormValidate,
        initialErrors:{
            date: "La fecha es requerida",
            time: "La hora es requerida"
        },
        onSubmit: async (values)=> {
            try {
                await createAppointment(values)
                Swal.fire({
                    icon: "success",
                    title: "Turno agendado con éxito",
                    text: "Puedes verificarlo en tu lista de turnos",
                })
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: `${error.response.data.detail}`,
                    text: "Por favor, intenta de nuevo"
                })                
            } finally{
                formik.resetForm()
            }

        }
    })



    return(
        <div className= {styles.container}>
            <h1>Agendar Turno</h1>
            <form onSubmit={formik.handleSubmit}>

                <div>
                    <label >
                        <input 
                        id="date"
                        type= "date"
                        name="date"
                        min={new Date().toISOString().split("T")[0]}
                        onChange={formik.handleChange}
                        value= {formik.values.date}
                        className= {styles.input}
                        />
                        {
                            formik.errors.date ? ( 
                            <>
                            <div>
                                {formik.errors.date}
                            </div>
                            </>
                            ) : null
                        }
                    </label>
                </div>


                <div>
                    <label >
                        <input 
                        id="time"
                        type="time"
                        name="time"
                        onChange={formik.handleChange}
                        value= {formik.values.time}
                        className= {styles.input}
                        />
                        {
                            formik.errors.time ? ( 
                            <>
                            <div>
                                {formik.errors.time}
                            </div>
                            </>
                            ) : null
                        }
                    </label>
                </div>

                <button 
                type="submit"
                disabled= {Object.keys(formik.errors).length > 0}
                className={styles.submitButton}
                >
                    Agendar
                </button>

            </form>
        </div>
    )

}

export default Schedule