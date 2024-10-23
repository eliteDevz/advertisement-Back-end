import { Schema, model, Types } from 'mongoose';

const vendorSchema = new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, trim: true },
    location: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    avatar: { type: String, trim: true },
    user: { type: Types.ObjectId, required: true, ref: 'User' }
}, {
    timestamps: true
});

export const Vendor = model('Vendor', vendorSchema);
