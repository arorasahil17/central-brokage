import express from "express";
const api = express.Router();
import {
  adminAuthenticate,
  adminLogin,
  adminPasswordChange,
  adminPasswordReset,
  adminSign,
} from "../controller/admin.js";
import { adminAuth } from "../middleware/auth.js";

api
  .post("/admin-sign", adminSign)
  .post("/admin-login", adminLogin)
  .get("/admin-auth", adminAuth, adminAuthenticate)
  .post("/admin/password-reset", adminPasswordReset)
  .post("/admin/password-change", adminPasswordChange);

export default api;
