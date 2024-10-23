// export const hasPermission = (vendorRole, permission) => {
//     const rolePermissions = {
//         ADMIN: ['UPLOAD_FILE', 'DELETE_FILE', 'VIEW_FILE'],
//         VENDOR: ['UPLOAD_FILE', 'VIEW_FILE'],
//         GUEST: ['VIEW_FILE']
//     };
//     return rolePermissions[vendorRole]?.includes(permission);
// };

// export const getVendorRole = (req) => {
//     // Your logic to get the vendor's role
//     return req.vendor.role;
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
