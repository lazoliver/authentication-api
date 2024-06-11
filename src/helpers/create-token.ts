import jwt from "jsonwebtoken";
import vars from "../config/vars";

const { secret } = vars();

function createToken(email: string): string {
  const token = jwt.sign({ email: email }, secret, {
    expiresIn: "1h",
  });

  return token;
}

export default createToken;
