import { loginFormValidate } from "../../helpers/LoginFormValidate";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../contex/UsersContex";
import styles from "./Login.module.css";

const Login = () => {
  const { loginUser } = useContext(UsersContext);

  const navigate = useNavigate();
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

    onSubmit: async (values) => {
      try {
        await loginUser(values);
        Swal.fire({
          icon: "success",
          title: "Logueado Correctamente",
        });
        navigate("/");
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error en el Login",
          text: "Error al iniciar sesión, intente nuevamente",
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Formulario de Login.</h2>
      <div className={styles.input}>
        <label>UserName:</label>
        <input
          className={styles.cas}
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

      <div className={styles.input}>
        <label>Password:</label>
        <input
          className={styles.cas}
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
        className={styles.buton}
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
      <label className={styles.input}>
        Aun no tienes cuenta? <Link to="/register">Registrate</Link>
      </label>
    </form>
  );
};

export default Login;
