import express from "express";

const router = express.Router();

import {
  getCurrentUser,
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController";
import authenticate from "../middleware/authentiaction";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.use(authenticate);
router.get("/user", getCurrentUser);

export default router;
