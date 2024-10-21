import { Schema, model, Types } from "mongoose";

const advertSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    // imageUrl: { type: String, required: true },
    icon: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const AdvertModel = model('Advert', advertSchema);