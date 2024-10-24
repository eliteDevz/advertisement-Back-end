import { AdvertModel } from '../models/advert_model.js';
import { addAdsValidator, updateAdsValidator } from '../validators/advert_validator.js';


export const addAdvert = async (req, res, next) => {
    try {
        // console.log(req.file);
        // Validate vender input
        const { error, value } = addAdsValidator.validate({
            ...req.body,
            icon: req.file?.filename
        });
        
        // Write vendor Ads to database
        const advert = await AdvertModel.create({
            ...value,
            vendor: req.auth.id
        });
        //Respond to request
        return res.status(201).json('Ads was added');
    } catch (error) {
        console.error('error adding advert', error);
        next(error);
    }
};


export const countAdverts = async (req, res, next) => {
    try {
        const { filter = "{}" } = req.query;
        //count todos in database
        const count = await AdvertModel.countDocuments(JSON.parse(filter));
        //Responto request
        return res.json({ count });
    } catch (error) {
        next(error);
    }
}


export const getAdvertById = async (req, res, next) => {
    try {
        //Fetch the ad by ID from the database
        const ad = await AdvertModel.findById(req.params.id);
        if (!ad) {
            return res.status(404).json('Ad not found');
        }
        //Respond to the request
        return res.status(200).json(ad);
    } catch (error) {
        next(error);
    }
};


export const getAllAdvert = async (req, res, next) => {
    try {
        const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;
        //Fetch Vendor Ads from database
        const ads = await AdvertModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip);
        //Return response
        return res.status(200).json(ads);
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
        const advert = await AdvertModel.findByIdAndUpdate(
            {
                _id: req.params.id,
                user: req.auth.id
            },
            value,
            { new: true }
        );
        if (!advert) {
            return res.status(404).json('Ad not found');
        }
        //Respond to request
        return res.status(201).json(advert);
    } catch (error) {
        next(error);
    }
};

export const deleteAdvert = async (req, res, next) => {
    try {
        //Delete the as by ID from the database
        const advert = await AdvertModel.findByIdAndDelete(
        {
            _id: req.params.id,
            user: req.auth.id
        }
    );
        if (!advert) {
            return res.status(404).json('Ad not found');
        }
        //Respond to the request
        return res.status(200).json('Ad Deleted successfully');
    } catch (error) {
        next(error);
    }
};