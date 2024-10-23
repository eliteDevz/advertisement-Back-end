import multer from 'multer';
import { multerSaveFilesOrg } from 'multer-savefilesorg';


export const localUpload = multer({ dest: 'uploads/' });

// Set up storage engine
export const advertIconUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        limits: { fileSize: 1000000 }, // Limit file size to 1MB
        relativePath: '/vender-api/advert/*',
    }),
    preservePath: true
});

// Initialize upload
const upload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_AOI_KEY,
        limits: { fileSize: 1000000 }, // Limit file size to 1MB
        fileFilter: (req, file, cb) => {
            checkFileType(file, cb);
            relativePath: '/vendor/advert/*'
        }
    }),
    // .single('image'),
    preservePath: true
});

// export const hasPermission = (vendorRole, permission) => {
//     const rolePermissions = {
//         ADMIN: ['UPLOAD_FILE', 'DELETE_FILE', 'VIEW_FILE'],
//         VENDOR: ['UPLOAD_FILE', 'VIEW_FILE'],
//         GUEST: ['VIEW_FILE']
//     };
//     return rolePermissions[vendorRole]?.includes(permission);
// };

// export const getVendorRole = (req) => {
//     // Assuming the vendor's role is stored in req.vendor (set by a previous authentication middleware)
//     if (req.vendor && req.vendor.role) {
//         return req.vendor.role;  // return the role (e.g., 'ADMIN', 'VENDOR', 'GUEST')
//     } else {
//         return 'GUEST';  // default role if none is found
//     }
// };


// Other exports
export const isAuthenticated = (req, res, next) => {
    // Your authentication logic here
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};



// // Set up storage engine
// export const carsIconUpload = multer({
//     storage: multerSaveFilesOrg({
//         apiAccessToken: process.env.SAVEFILESORG_API_KEY,
//         limits: { fileSize: 1000000 }, // Limit file size to 1MB
//         relativePath: '/vender-api/cars/*',
//     }),
//     preservePath: true
// });

// // Initialize upload
// const cars = multer({
//     storage: multerSaveFilesOrg({
//         apiAccessToken: process.env.SAVEFILESORG_AOI_KEY,
//         limits: { fileSize: 1000000 }, // Limit file size to 1MB
//         fileFilter: (req, file, cb) => {
//             checkFileType(file, cb);
//             relativePath: '/vendor/cars/*'
//         }
//     }),
//     // .single('image'),
//     preservePath: true
// });