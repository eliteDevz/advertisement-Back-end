import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const advertSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true},
    price: { type: Number, required: true },
    image: { type: String, required: true },
    vendor: { type: Types.ObjectId, required: true, ref: 'Vendor' }
}, {
    timestamps: true
});

advertSchema.index({ category: 'text', title: 'text' });

advertSchema.plugin(toJSON);

export const AdvertModel = model('Advert', advertSchema);