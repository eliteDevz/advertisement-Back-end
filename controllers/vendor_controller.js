import { Vendor } from '../models/vendor_model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerVendorValidator, loginVendorValidator, updateProfileValidator } from '../validators/vendor_validator.js';
import { AdvertModel } from '../models/advert_model.js';


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

        res.json({
            message:'User registered!'
        });

       
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


export const loginVendor = async (req, res) => {
    try {
        // validate user input
        const {error, value} = loginVendorValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // find one user with identifier
        const user = await Vendor.findOne({email: value.email});
        if (!user) {
            return res.status(404).json('User does not exist!');
        }
        // compare their passwords
        const correctPassword = bcrypt.compareSync(value.password, user.password);
        if (!correctPassword) {
            return res.status(401).json('Invalid credentials');
        }
        // sign a token for user
        const token = jwt.sign(
            {id:user.id},
            process.env.JWT_PRIVATE_KEY,
            {expiresIn: '30h'}
        );
        // respond to request
        res.json({
            message:'User logged in!',
            accessToken: token
        });
    } catch (error) {
        next(error)
    }
};


export const getAllVendors = async (req, res, next) => {
    try {
        const { filter = "{}", limit = 10, skip = 0 } = req.query;
        // fetch todos from the database
        const todos = await Vendor
        .find(JSON.parse(filter))
        .limit(limit)
        .skip(skip);
        // return response
        res.status(200).json(todos);
    } catch (error) {
        next(error);
    }
}


export const getProfile = async (req, res, next) => {
    try {
        // find authenticated user from database
        const user = await Vendor.findById(req.auth.id).select({password: false});
        // respond to request
        res.json(user);
    } catch (error) {
        next(error);
    }
}


export const getVendorAdverts = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;
        //Fetch Vendor Ads from database
        const ads = await AdvertModel
            .find({
                ...JSON.parse(filter),
                vendor: req.auth.id
            })
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip);
        //Return response
        return res.status(200).json(ads);
    } catch (error) {
        next(error);
    }
}


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