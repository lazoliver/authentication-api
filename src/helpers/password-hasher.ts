import bcrypt from "bcrypt";

async function passwordHasher(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, 12);

  return hashedPassword;
}

export default passwordHasher;
