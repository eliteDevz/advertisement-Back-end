import { required } from "joi";
import { Schema, model, Types } from "mongoose";

const advertSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    // imageUrl: { type: String, required: true },
    icon: { type: String, required: true },
    category: { type: String, required: true},
    user: { type: Types.ObjectId, required: true, ref: 'User' }
}, {
    timestamps: true
});

advertSchema.plugin(toJSON)

export const AdvertModel = model('Advert', advertSchema);