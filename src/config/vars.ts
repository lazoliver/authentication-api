import { configDotenv } from "dotenv";
configDotenv();

interface Vars {
  port: number;
  release_mode: string;
}

function vars() {
  const vars: Vars = {
    port: parseInt(process.env.PORT as string) || 4001,
    release_mode: process.env.RELEASE_MODE as string,
  };

  return vars;
}

export default vars;
