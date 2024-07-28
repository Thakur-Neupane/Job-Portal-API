import bcryptjs from "bcryptjs";
const saltRound = 15;

export const hashPassword = (plainPassword) => {
  return bcryptjs.hashSync(plainPassword, saltRound);
};

export const comparePassword = (plainPassword, hashedPass) => {
  return bcryptjs.compareSync(plainPassword, hashedPass);
};
