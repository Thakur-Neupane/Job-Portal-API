import userRouter from "../routers/userRouter.js";

export default [
  {
    path: "/api/v1/user",
    middlewares: [userRouter],
  },
];
