import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true, //! prevents form xss attacks
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //! prevents from csrf attacks
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};
export default generateTokenAndSetCookie;
