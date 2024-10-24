import { Router } from "express";
import { addAdvert, getAllAdvert, getAdvertById, updateAdvert, countAdverts, deleteAdvert } from "../controllers/advert_controller.js";
import { advertIconUpload } from "../middlewares/advert_upload.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const advertRouter = Router();

advertRouter.get('/adverts/count', countAdverts);

advertRouter.post('/adverts', isAuthenticated, advertIconUpload.single('image'), addAdvert);

advertRouter.get('/adverts', getAllAdvert);

advertRouter.get('/adverts/:id', getAdvertById);

advertRouter.patch('/adverts/:id', isAuthenticated, advertIconUpload.single('image'), updateAdvert);

advertRouter.delete('/adverts/:id', isAuthenticated, deleteAdvert);
