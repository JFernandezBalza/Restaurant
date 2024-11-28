import { registerFormValidate } from "../../helpers/RegisterFormValidate";
import { useFormik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthdate: "",
      nDni: "",
      username: "",
      password: "",
    },
    initialErrors: {
      name: "Name is required",
      email: "Email is required",
      birthdate: "Birthdate is required",
      nDni: "nDni is required",
      username: "Username is required",
      password: "Password is required",
    },

    validate: registerFormValidate,
    onSubmit: (values) => {
      axios
        .post("http://localhost:3000/users/register", values)
        .then((res) => {
          if (res.status === 201) {
            Swal.fire({
              icon: "success",
              title: "Registro Exitoso!",
            });
          }
        })
        .catch((error) => {
          if (error.response.data.detail.includes("nDni")) {
            Swal.fire({
              icon: "error",
              title: `Ya existe un usuario con el nDni: ${formik.values.nDni}`,
            });
          }
          if (error.response.data.detail.includes("username")) {
            Swal.fire({
              icon: "error",
              title: `Ya existe un usuario con el username: ${formik.values.username}`,
              text: "Intente con otro username",
            });
          }

          if (error.response.data.detail.includes("email")) {
            Swal.fire({
              icon: "error",
              title: `Ya existe un usuario con el email: ${formik.values.email}`,
              text: "Intente con otro email",
            });
          }
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Formulario de Registro.</h2>

      <div>
        <label>Nombre:</label>
        <input
          className=""
          type="text"
          name="name"
          placeholder="Tu Nombre"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name ?? formik.errors.name ? (
          <label className="">{formik.errors.name} </label>
        ) : null}
      </div>

      <div>
        <label>Email:</label>
        <input
          className=""
          type="text"
          name="email"
          placeholder="@mail.com"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && formik.errors.email ? (
          <label className="">{formik.errors.email} </label>
        ) : null}
      </div>

      <div>
        <label>Fecha de Nacimiento:</label>
        <input
          className=""
          type="date"
          name="birthdate"
          onChange={formik.handleChange}
          value={formik.values.birthdate}
        />
        {formik.errors.birthdate && formik.errors.birthdate ? (
          <label className="">{formik.errors.birthdate} </label>
        ) : null}
      </div>

      <div>
        <label>nDni:</label>
        <input
          className=""
          type="text"
          name="nDni"
          onChange={formik.handleChange}
          value={formik.values.nDni}
        />
        {formik.errors.nDni && formik.errors.nDni ? (
          <label className="">{formik.errors.nDni} </label>
        ) : null}
      </div>

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
          !formik.values.name ||
          !formik.values.email ||
          !formik.values.birthdate ||
          !formik.values.nDni ||
          !formik.values.username ||
          !formik.values.password
        }
      >
        Submit
      </button>
      <br />
      <label>
        Ya tienes cuenta? <Link to= "/login">Login</Link>
      </label>
    </form>
  );
};

export default Register;
