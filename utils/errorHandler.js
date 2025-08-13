export const handleSequelizeError = (error) => {
  if (error.statusCode) {
    return { status: error.statusCode, message: error.message };
  }

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
    const field = error.errors[0]?.path;
    let message = "The field 'field' already exists";

    if (field) {
      message = message.replace("field", field);
    }

    return {
      status: 400,
      message,
      field,
    };
  }

  return { status: 500, message: "Server error" };
};
