import { Vendor } from '../models/vendor_model.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerVendorValidator, loginVendorValidator, updateProfileValidator } from '../validators/vendor_validator.js';

export const registerVendor = async (req, res) => {
    const { error, value } = registerVendorValidator.validate(req.body);
    if (error) {
        return res.status(422).json({ errors: error.details });
    }

    const { email, password } = value;

    try {
        let vendor = await Vendor.findOne({ email });

        if (vendor) {
            return res.status(400).json({ msg: "Vendor already exists" });
        }

        vendor = new Vendor({
            ...value,
            password: await bcrypt.hash(password, 10)
        });

        await vendor.save();

        const payload = {
            vendor: {
                id: vendor.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '2 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const loginVendor = async (req, res) => {
    const { error, value } = loginVendorValidator.validate(req.body);
    if (error) {
        return res.status(422).json({ errors: error.details });
    }

    const { email, password } = value;

    try {
        let vendor = await Vendor.findOne({ email });

        if (!vendor) {
            return res.status(404).json({ msg: "Vendor does not exist" });
        }

        const correctPassword = bcrypt.compareSync(password, vendor.password);

        if (!correctPassword) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: vendor.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Vendor logged in',
            accessToken: token
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const getProfile = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.vendor.id).select('-password');
        res.json(vendor);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const updateProfile = async (req, res) => {
    const { error, value } = updateProfileValidator.validate({
        ...req.body,
        avatar: req.file?.filename
    });
    if (error) {
        return res.status(422).json({ errors: error.details });
    }

    try {
        await Vendor.findByIdAndUpdate(req.vendor.id, value);
        res.json('Vendor profile updated');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const logoutVendor = (req, res) => {
    res.json({ msg: 'Vendor logged out successfully' });
};
