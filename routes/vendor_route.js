import { Router } from "express";
import { registerVendor, loginVendor, logoutVendor, getProfile, updateProfile } from "../controllers/vendor_controller.js";
import { isAuthenticated } from "../middlewares/vendor_auth.js";

const vendorRouter = Router();

// Define routes
vendorRouter.post('/vendors/register', registerVendor);
vendorRouter.post('/vendors/login', loginVendor);
vendorRouter.post('/vendors/logout', isAuthenticated, logoutVendor);
vendorRouter.get('/vendors/me', isAuthenticated,  getProfile);
vendorRouter.patch('/vendors/me', isAuthenticated, updateProfile);

export default vendorRouter;
