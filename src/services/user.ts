import userModel from "../models/user";
import { User } from "../interfaces/user";

async function checkUser(email: string) {
  const user = await userModel.findOne({ email: email });

  return user;
}

const userService = {
  async register(user: User) {
    const userExist = await checkUser(user.email);

    if (userExist) {
      return;
    }

    const registerUser = await userModel.create(user);

    return registerUser;
  },
  async login(user: User) {
    const userExist = await checkUser(user.email);

    if (!userExist) {
      return;
    }

    return userExist;
  },
};

export default userService;
