import { UserModel } from "../models/user.js";
import bcrypt from'bcryptjs';
import jwt from 'jsonwebtoken';
import { addRegisterValidator, addLoginValidator } from "../validators/user.js";





export const addRegister =async (req,res,next) =>{
    try {
        // validate user imput
        const {error,value} =addRegisterValidator.validate(req.body);
        if(error){
            return res.status(422).json(error);
        }
        // check if user does not exist
        const user = await UserModel.findOne({email:value.email});
if (user){
    return res.status(409).json('user already exist');
}
//hash their password
const hashedPassword = bcrypt.hashSync(value.password, 10);
//save user into database
await UserModel.create({
    ...value,

    password: hashedPassword
});
        res.json('user registered successfully');
    } catch (error) {
       next(error) ;
    }
}
export const addLogin = async (req,res,next) =>{
    try {
        // validate user imput
        const {error,value} =addLoginValidator.validate(req.body);
        if(error){
            return res.status(422).json(error);
        }
        // find one user with identifier
        const user = await UserModel.findOne({ email: value.email });
        if (!user) {
            return res.status(404).json('user does not exist');
        }

        //compare their passwords
        const correctPassword = bcrypt.compareSync(value.password, user.password);
        if (!correctPassword) {
            return res.status(401).json('invalid credentials');
        }
        //sign a token for the user
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '24h' }

        );
        //respond to request
        res.json({
            message: 'user logged in!',
            accessToken: token
        });
        res.json('logged in successfully');
    } catch (error) {
        next(error);
    }
}
export const getProfile =  async(req,res,next) =>{
    try {
        // find authenticated usedr from database
        const user = await UserModel.findById(req.auth.id).select({ password: false });
        res.json(user);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

export const addLogout = (req,res,next) =>{
    try {
        res.json('logged out');
    } catch (error) {
         next(error);
    }
}
export const updatedProfile = (req,res,next) =>{
    try {
        res.json('user profile updated');
    } catch (error) {
        next(error);
    }
};

// export const deleteUser = async (req, res, next) => {
//     try {
//         const user = await UserModel.findByIdAndDelete(req.params.id);
//         res.status(204).json('User was deleted');
//     } catch (error) {
//         next(error);
//     }
// }