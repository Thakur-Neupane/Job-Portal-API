import userSchema from "./userSchema.js";

export const insertUser = (userObj) => {
  return userSchema(userObj).save();
};
