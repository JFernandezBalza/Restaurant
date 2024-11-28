/* eslint-disable react/prop-types */
import { loginFormValidate } from "../../helpers/LoginFormValidate";
import { useFormik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom"

const Login = ({setIsLogged}) => {

  const navigate= useNavigate()

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: loginFormValidate,
    initialErrors: {
      username: "Username is required",
      password: "Password is required",
    },

    onSubmit: (values) => {
      axios
        .post("http://localhost:3000/users/login", values)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Login Correcto",
              text: "Bienvenido " + res.data.username,
            });
          }
          setIsLogged(true)
          navigate("/")
        })
        .catch((error) => {
          if (error) {
            Swal.fire({
              icon: "error",
              title: "Error en el Login",
              text: "Error al iniciar sesión, intente nuevamente",
            });
          }
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Formulario de Login.</h2>
      <div>
        <label>UserName:</label>
        <input
          className=""
          type="text"
          name="username"
          placeholder="Nombre de Usuario"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.errors.username && formik.errors.username ? (
          <label className="">{formik.errors.username} </label>
        ) : null}
      </div>

      <div>
        <label>Password:</label>
        <input
          className=""
          type="password"
          name="password"
          placeholder="********"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && formik.errors.password ? (
          <label className="">{formik.errors.password} </label>
        ) : null}
      </div>

      <button
        className=""
        type="submit"
        disabled={
          Object.keys(formik.errors).length > 0 ||
          !formik.values.username ||
          !formik.values.password
        }
      >
        Submit
      </button>
      <br />
      <label>
        Aun no tienes cuenta ? <Link to= "/register">Registrate</Link>
      </label>
    </form>
  );
};

export default Login;
