const errorHandler = (err) => {
  let errors = { email: "", password: "" };
  console.log(err);

  if (err.code === 11000) {
    errors.email = "Email id already exists, please try logging in";
    return errors;
  }

  if (err.message.includes("User validation failed:")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports = errorHandler;
