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
    // Create a unique model ID for each group of model files
    if (!req.modelId && (file.fieldname.includes('model') || file.fieldname.includes('Model'))) {
      req.modelId = `model_${Date.now()}`;
    }
    
    const modelDir = `uploads/glassesModels/${req.modelId || 'default'}`;
    
    if (file.fieldname === 'images') {
      cb(null, 'uploads/glasses');
    } else if (file.fieldname === 'modelArmsOBJ' || file.fieldname === 'model-arms-obj') {
      fs.mkdirSync(`${modelDir}/modelArms`, { recursive: true });
      cb(null, `${modelDir}/modelArms`);
    } else if (file.fieldname === 'modelArmsMTL' || file.fieldname === 'model-arms-mtl') {
      fs.mkdirSync(`${modelDir}/modelArms`, { recursive: true });
      cb(null, `${modelDir}/modelArms`);
    } else if (file.fieldname === 'modelLensesOBJ' || file.fieldname === 'model-lenses-obj') {
      fs.mkdirSync(`${modelDir}/modelLenses`, { recursive: true });
      cb(null, `${modelDir}/modelLenses`);
    } else if (file.fieldname === 'modelLensesMTL' || file.fieldname === 'model-lenses-mtl') {
      fs.mkdirSync(`${modelDir}/modelLenses`, { recursive: true });
      cb(null, `${modelDir}/modelLenses`);
    } else if (file.fieldname === 'modelFrameOBJ' || file.fieldname === 'model-frame-obj') {
      fs.mkdirSync(`${modelDir}/modelFrame`, { recursive: true });
      cb(null, `${modelDir}/modelFrame`);
    } else if (file.fieldname === 'modelFrameMTL' || file.fieldname === 'model-frame-mtl') {
      fs.mkdirSync(`${modelDir}/modelFrame`, { recursive: true });
      cb(null, `${modelDir}/modelFrame`);
    } else if (file.fieldname === 'modelArmsMaterial' || file.fieldname === 'model-arms-material') {
      fs.mkdirSync(`${modelDir}/modelArmsMaterial`, { recursive: true });
      cb(null, `${modelDir}/modelArmsMaterial`);
    } else if (file.fieldname === 'modelFrameMaterial' || file.fieldname === 'model-frame-material') {
      fs.mkdirSync(`${modelDir}/modelFrameMaterial`, { recursive: true });
      cb(null, `${modelDir}/modelFrameMaterial`);
    } else {
      // For any other fields, store in a default folder
      fs.mkdirSync(`${modelDir}/other`, { recursive: true });
      cb(null, `${modelDir}/other`);
    }
  },
  filename: (req, file, cb) => {
    // Create unique filename with timestamp and random number
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, `glasses-${uniqueSuffix}${extension}`);
  }
});

// File filter to allow image and 3D model files
const fileFilter = (req, file, cb) => {
  // Check if this is a model file (OBJ or MTL)
  if (file.fieldname.includes('OBJ') || file.fieldname.includes('obj') ||
      file.fieldname.includes('MTL') || file.fieldname.includes('mtl') || 
      file.fieldname.includes('Material') || file.fieldname.includes('material')) {
    return cb(null, true); // Allow all model files
  }
  
  // For regular images, check the file type
  const allowedImageTypes = /jpeg|jpg|png|gif/;
  const extname = allowedImageTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedImageTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files or 3D model files are allowed!'), false);
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
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max size for 3D model files
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
      } catch (err) {
        console.error(`Error deleting image ${imagePath}:`, err);
      }
    }
  });
};

module.exports = { 
  uploadUserPicture, 
  uploadGlassesImages,
  deleteImageFiles
};
