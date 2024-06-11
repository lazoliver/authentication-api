import { User } from "../interfaces/user";

const authErrors = {
  register(user: User) {
    let errors;

    if (!user.email) {
      return (errors = "Email is mandatory");
    }

    if (!user.password) {
      return (errors = "Password is mandatory");
    }
  },
  login(user: User) {
    let errors;

    if (!user.email) {
      return (errors = "Email is mandatory");
    }

    if (!user.password) {
      return (errors = "Password is mandatory");
    }
  },
};

export default authErrors;
