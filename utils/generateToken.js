import jwt from "jsonwebtoken";
const { sign } = jwt;
export const generateAccessToken = (id, role) => {
  return sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (id, role) => {
  return sign({ id, role }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};
