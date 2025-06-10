const Glasses = require("../models/Glasses");
const { ObjectId } = require('mongoose').Types;
const { deleteImageFiles } = require('../middlewares/upload');

const create = async (data) => {
    return await Glasses.create(data);
};

const update = async (id, data) => {
    // If there are images to delete, first get the current glasses
    if (data.deletedImages && data.deletedImages.length > 0) {
        const currentGlasses = await Glasses.findById(id);
        if (!currentGlasses) {
            throw new Error('Glasses not found');
        }
        
        // Filter out the deleted images
        const remainingImages = currentGlasses.images.filter(img => 
            !data.deletedImages.includes(img)
        );
        
        // Ensure at least one image remains or new images are being added
        if (remainingImages.length === 0 && (!data.images || data.images.length === 0)) {
            throw new Error('At least one image must remain for the product');
        }
        
        // Update the images array
        data.images = remainingImages;
        
        // Delete the image files
        deleteImageFiles(data.deletedImages);
        
        // Remove deletedImages from data to avoid saving it to DB
        delete data.deletedImages;
    }
    
    return await Glasses.findByIdAndUpdate(id, data, { new: true });
};

const search = async (query) => {
    const searchCriteria = {};
    
    for (const key in query) {
        if (key === '_id') {
            try {
                searchCriteria[key] = new ObjectId(query[key]);
            } catch (err) {
                throw new Error('Invalid ID format');
            }
        }
        else if (key === 'price' && typeof query[key] === 'object') {
            searchCriteria[key] = {};
            for (const op in query[key]) {
                const mongoOp = `$${op}`;
                searchCriteria[key][mongoOp] = Number(query[key][op]);
            }
        }
        else if (key === 'price' || key === 'weight' || key === 'stock') {
            searchCriteria[key] = Number(query[key]);
        }
        else if (key === 'gender' || key === 'type' || key === 'size') {
            searchCriteria[key] = query[key];
        }
        else if (key === 'tryOn') {
            searchCriteria[key] = query[key] === true || query[key] === 'true';
        }
        else if (key === 'colors') {
            searchCriteria[key] = { $in: [query[key]] };
        }
        else {
            searchCriteria[key] = { $regex: query[key], $options: "i" };
        }
    }
    return await Glasses.find(searchCriteria).sort({ price: 1 });
};
const deleteGlasses = async (id) => {
    // First get the glasses to access its images
    const glasses = await Glasses.findById(id);
    if (!glasses) {
        return null;
    }
    
    // Delete image files
    if (glasses.images && glasses.images.length > 0) {
        deleteImageFiles(glasses.images);
    }
    
    // Delete AR model files if they exist
    if (glasses.arModels) {
        const modelFiles = [];
        if (glasses.arModels.modelArmsOBJ) modelFiles.push(glasses.arModels.modelArmsOBJ);
        if (glasses.arModels.modelArmsMTL) modelFiles.push(glasses.arModels.modelArmsMTL);
        if (glasses.arModels.modelLensesOBJ) modelFiles.push(glasses.arModels.modelLensesOBJ);
        if (glasses.arModels.modelLensesMTL) modelFiles.push(glasses.arModels.modelLensesMTL);
        if (glasses.arModels.modelFrameOBJ) modelFiles.push(glasses.arModels.modelFrameOBJ);
        if (glasses.arModels.modelFrameMTL) modelFiles.push(glasses.arModels.modelFrameMTL);
        
        // Delete material image files
        if (glasses.arModels.modelArmsMaterial && glasses.arModels.modelArmsMaterial.length > 0) {
            modelFiles.push(...glasses.arModels.modelArmsMaterial);
        }
        if (glasses.arModels.modelFrameMaterial && glasses.arModels.modelFrameMaterial.length > 0) {
            modelFiles.push(...glasses.arModels.modelFrameMaterial);
        }
        
        if (modelFiles.length > 0) {
            deleteImageFiles(modelFiles);
        }
    }
    
    // Now delete the glasses document
    return await Glasses.findByIdAndDelete(id);
};

const getAll = async () => {
    return await Glasses.find();
};

const getById = async (id) => {
    return await Glasses.findById(id);
};

const getBestSellers = async () => {
    return await Glasses.find().sort({ numberOfSells: -1 }).limit(20);
};

const getNewArrivals = async () => {
    return await Glasses.find()
        .sort({ createdAt: -1 })
        .limit(20);
};

module.exports = {
    create,
    update,
    search,
    delete: deleteGlasses,
    getAll,
    getById,
    getBestSellers,
    getNewArrivals,
};
