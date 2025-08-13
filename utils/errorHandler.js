export const handleSequelizeError = (error) => {
  if (error.name === "SequelizeValidationError") {
    return {
      status: 400,
      message: "Validation error",
      errors: error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      })),
    };
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    return { status: 400, message: "Username or email already exists" };
  }

  return { status: 500, message: "Server error" };
};
