export const registerFormValidate = (input) => {
  const errors = {};

  if (!input.name.trim()) errors.name = "Name is required";

  if (!input.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "El correo electrónico no es válido.";
  }

  if (!input.birthdate) errors.birthdate = "Birthday is required";
  else {
    const today = new Date();
    const birthdate = new Date(input.birthdate);
    const age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    const dayDiff = today.getDate() - birthdate.getDate();

    if (
      age < 18 ||
      (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
    ) {
      errors.birthdate = "User must be at least 18 years old";
    }
  }

  if (!input.nDni.trim()) {
    errors.nDni = "nDni is required";
  } else if (input.nDni.length < 7) {
    errors.nDni = "nDni must be at least 7 digits long";
  } else if (!/^\d+$/.test(input.nDni))
    errors.nDni = "nDni number must contain only numbers";

  if (!input.username.trim()) errors.username = "Username is required";
  else if (!/^[a-zA-Z0-9]+$/.test(input.username)) {
    errors.username = "Username must contain only letters and numbers";
  }

  if (!input.password.trim()) {
    errors.password = "Password is required";
  } else if (input.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (!/[A-Z]/.test(input.password)) {
    errors.password = "Password must contain at least one uppercase letter";
  } else if (!/[0-9]/.test(input.password)) {
    errors.password = "Password must contain at least one number";
  } else if (!/[^A-Za-z0-9]/.test(input.password)) {
    errors.password = "Password must contain at least one special character";
  }

  return errors;
};
