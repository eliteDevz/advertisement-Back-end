import { Router } from "express";
import { addAdvert, getAllAdvert, getAdvertById, updateAdvert, deleteAdvert } from "../controllers/advert_controller.js";
import { advertIconUpload } from "../middlewares/advert_upload.js";

export const advertRouter = Router();

advertRouter.get('advert/count');

advertRouter.post('/advert', advertIconUpload.single('icon'), addAdvert);

advertRouter.get('/advert', getAllAdvert);

advertRouter.get('/advert/:id', getAdvertById);

advertRouter.patch('/advert/:id', advertIconUpload.single('icon'), updateAdvert);

advertRouter.delete('/advert/:id', advertIconUpload.single('icon'), deleteAdvert);
