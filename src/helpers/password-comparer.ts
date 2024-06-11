import bcrypt from "bcrypt";

async function passwordComparer(a: string, b: string): Promise<boolean> {
  const passwordMatch = await bcrypt.compare(a, b);

  return passwordMatch;
}

export default passwordComparer;
