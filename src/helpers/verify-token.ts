import jwt from "jsonwebtoken";
import vars from "../config/vars";

const { secret } = vars();

function verifyToken(token: string) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid token");
  }
}

export default verifyToken;
