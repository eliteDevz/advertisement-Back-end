import { Schema, model} from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';

const vendorSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, trim: true },
    location: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    avatar: { type: String, trim: true },
}, {
    timestamps: true
});

vendorSchema.index({ name: 'text' });

vendorSchema.plugin(toJSON)

export const Vendor = model('Vendor', vendorSchema);