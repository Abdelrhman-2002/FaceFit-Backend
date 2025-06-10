const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set storage engine for profile pictures
const userPictureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/usersPictures');
  },
  filename: (req, file, cb) => {
    // Create unique filename with customer ID and timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, `customer-${req.customerId}-${uniqueSuffix}${extension}`);
  }
});

// Set storage engine for glasses images
const glassesImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'images') {
      cb(null, 'uploads/glasses');
    } else if (file.fieldname.startsWith('model')) {
      cb(null, 'uploads/glassesModels');
    } else {
      cb(null, 'uploads/usersPictures'); // fallback
    }
  },
  filename: (req, file, cb) => {
    // Create unique filename with timestamp and random number
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, `glasses-${uniqueSuffix}${extension}`);
  }
});

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Create upload middleware for user pictures
const uploadUserPicture = multer({
  storage: userPictureStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max size
  fileFilter: fileFilter
});

// Create upload middleware for glasses images
const uploadGlassesImages = multer({
  storage: glassesImageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max size
  fileFilter: fileFilter
});

// Helper function to delete image files
const deleteImageFiles = (imagePaths) => {
  if (!imagePaths || !Array.isArray(imagePaths) || imagePaths.length === 0) {
    return;
  }
  
  imagePaths.forEach(imagePath => {
    if (!imagePath) return;
    
    // Make sure the path is absolute
    const fullPath = path.isAbsolute(imagePath) ? 
      imagePath : 
      path.join(process.cwd(), imagePath);
    
    // Only delete if file exists
    if (fs.existsSync(fullPath)) {
      try {
        fs.unlinkSync(fullPath);
        console.log(`Deleted image: ${imagePath}`);
      } catch (err) {
        console.error(`Error deleting image ${imagePath}:`, err);
      }
    } else {
      console.log(`File not found: ${imagePath}`);
    }
  });
};

module.exports = { 
  uploadUserPicture, 
  uploadGlassesImages,
  deleteImageFiles
}; 