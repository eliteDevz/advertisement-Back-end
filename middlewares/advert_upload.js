import multer from 'multer';
import { multerSaveFilesOrg } from 'multer-savefilesorg';

export const localUpload = multer({ dest: 'uploads/' });

// Set up storage engine
export const advertIconUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        limits: { fileSize: 1000000 }, // Limit file size to 1MB
        relativePath: '/vender-api/watches/*',
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
            relativePath: '/vendor/watches/*'
        }
    }),
    // .single('image'),
    preservePath: true
});