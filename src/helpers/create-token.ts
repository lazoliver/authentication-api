import jwt from "jsonwebtoken";

function createToken(email: string): string {
  const token = jwt.sign({ email: email }, process.env.SECRET as string, {
    expiresIn: "1h",
  });

  return token;
}

export default createToken;
