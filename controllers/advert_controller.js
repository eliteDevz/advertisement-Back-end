import { AdvertModel } from '../models/advert_model.js';
import { addAdsValidator, updateAdsValidator, deleteAdsValidator } from '../validators/advert_validator.js';


export const addAdvert = async (req, res, next) => {
    try {
        // console.log(req.file);
        // Validate vender input
        const { error, value } = addAdsValidator.validate({
            ...req.body,
            icon: req.file?.filename, description: req.body.description?.substring(0, 200) // Limit description to 200 characters
        });
        if (error) {
            return res.status(422).json(error);
        }
        // Write vendor Ads to database
        await AdvertModel.create(value);
        //Respond to request
        res.status(201).json('Ads was added');
    } catch (error) {
        next(error);
    }
};

export const getAdvertById = async (req, res, next) => {
    try {
        //Fetch the ad by ID from the database
        const ads = await AdvertModel.findById(req.params.id);
        if (!ad) {
            return res.status(404).json('Ad not found');
        }
        //Respond to the request
        res.status(200).json(ads);
    } catch (error) {
        next(error);
    }
};

export const getAllAdvert = async (req, res, next) => {
    try {
        const { filter = "{}", sort ="{}", limit = 10, skip = 0 } = req.query;
        //Fetch Vendor Ads from database
        const ads = await VendorModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip);
        //Return response
        res.status(200).json(vendor);
    } catch (error) {
        next(error);
    }
}

export const updateAdvert = async (req, res, next) => {
    try {
        // Validate vender update
        const { error, value } = updateAdsValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Write vendor Ads to database
        const advert = await AdvertModel.findByIdAndUpdate(req.params.id, { new: true });
        //Respond to request
        res.status(201).json(vendor);
    } catch (error) {
        next(error);
    }
};

export const deleteAdvert = async (req, res, next) => {
    try {
        // Validate the ID
        const { error, value } = deleteAdsValidator.validate(req.params.id);
        if (error) {
            return res.status(422).json({ message: 'Invalid ID format' });
            }
        //Delete the as by ID from the database
        const ad = await AdvertModel.findByIdAndDelete(req.params.id);
        if (!ad) {
            return res.status(404).json('Ad not found');
        }
        //Respond to the request
        res.status(200).json('Ad Deleted successfully');
    } catch (error) {
        next(error);
    }
};