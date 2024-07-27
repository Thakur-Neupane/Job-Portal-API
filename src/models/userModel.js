import userSchema from "./userSchema";

export const insertUser = (userObj) => {
  return userSchema(userObj).save();
};
