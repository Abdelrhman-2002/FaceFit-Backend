const GlassesService = require("../services/glassesService");

const addGlasses = async (req, res) => {
    try {
        // Process uploaded files if any
        const data = { ...req.body };
        
        // Handle file uploads if present
        if (req.files) {
            // Process regular images
            if (req.files.images) {
                // Get image paths
                const imagePaths = req.files.images.map(file => file.path);
                data.images = imagePaths;
            }
            
            // Initialize arModels object if not exists
            if (!data.arModels) {
                data.arModels = {};
            }
            
            // Process AR model files
            if (req.files.modelArmsOBJ) data.arModels.modelArmsOBJ = req.files.modelArmsOBJ[0].path;
            if (req.files.modelArmsMTL) data.arModels.modelArmsMTL = req.files.modelArmsMTL[0].path;
            if (req.files.modelLensesOBJ) data.arModels.modelLensesOBJ = req.files.modelLensesOBJ[0].path;
            if (req.files.modelLensesMTL) data.arModels.modelLensesMTL = req.files.modelLensesMTL[0].path;
            if (req.files.modelFrameOBJ) data.arModels.modelFrameOBJ = req.files.modelFrameOBJ[0].path;
            if (req.files.modelFrameMTL) data.arModels.modelFrameMTL = req.files.modelFrameMTL[0].path;
            
            // Process material images
            if (req.files.modelArmsMaterial) {
                const materialPaths = req.files.modelArmsMaterial.map(file => file.path);
                data.arModels.modelArmsMaterial = materialPaths;
            }
            
            if (req.files.modelFrameMaterial) {
                const materialPaths = req.files.modelFrameMaterial.map(file => file.path);
                data.arModels.modelFrameMaterial = materialPaths;
            }
        }
        
        // Convert colors JSON string back to array if needed
        if (typeof data.colors === 'string' && data.colors.startsWith('[')) {
            try {
                data.colors = JSON.parse(data.colors);
            } catch (e) {
                console.error('Error parsing colors JSON:', e);
            }
        }
        
        const glasses = await GlassesService.addGlasses(data);
        res.status(201).json({
            status: "success",
            data: glasses
        });
    } catch (error) {
        res.status(400).json({ 
            status: "error",
            message: error.message 
        });
    }
};

const updateGlasses = async (req, res) => {
    try {
        // Process uploaded files if any
        const data = { ...req.body };
        
        // Handle file uploads if present
        if (req.files) {
            // Process regular images
            if (req.files.images) {
                // Get image paths
                const imagePaths = req.files.images.map(file => file.path);
                
                // If we have existing images (not being deleted), keep them
                if (data.images && Array.isArray(data.images)) {
                    data.images = [...data.images, ...imagePaths];
                } else {
                    data.images = imagePaths;
                }
            }
            
            // Process AR model files
            if (req.files.modelArmsOBJ) data.arModels = { ...data.arModels, modelArmsOBJ: req.files.modelArmsOBJ[0].path };
            if (req.files.modelArmsMTL) data.arModels = { ...data.arModels, modelArmsMTL: req.files.modelArmsMTL[0].path };
            if (req.files.modelLensesOBJ) data.arModels = { ...data.arModels, modelLensesOBJ: req.files.modelLensesOBJ[0].path };
            if (req.files.modelLensesMTL) data.arModels = { ...data.arModels, modelLensesMTL: req.files.modelLensesMTL[0].path };
            if (req.files.modelFrameOBJ) data.arModels = { ...data.arModels, modelFrameOBJ: req.files.modelFrameOBJ[0].path };
            if (req.files.modelFrameMTL) data.arModels = { ...data.arModels, modelFrameMTL: req.files.modelFrameMTL[0].path };
            
            // Process material images
            if (req.files.modelArmsMaterial) {
                const materialPaths = req.files.modelArmsMaterial.map(file => file.path);
                data.arModels = { ...data.arModels, modelArmsMaterial: materialPaths };
            }
            
            if (req.files.modelFrameMaterial) {
                const materialPaths = req.files.modelFrameMaterial.map(file => file.path);
                data.arModels = { ...data.arModels, modelFrameMaterial: materialPaths };
            }
        }
        
        // Process deletedImages if provided
        if (req.body.deletedImages) {
            // If it's a string, split it into an array
            if (typeof req.body.deletedImages === 'string') {
                data.deletedImages = req.body.deletedImages.split(',').filter(img => img.trim() !== '');
            } else if (Array.isArray(req.body.deletedImages)) {
                data.deletedImages = req.body.deletedImages;
            }
        }
        
        // Convert colors JSON string back to array if needed
        if (typeof data.colors === 'string' && data.colors.startsWith('[')) {
            try {
                data.colors = JSON.parse(data.colors);
            } catch (e) {
                console.error('Error parsing colors JSON:', e);
            }
        }
        
        const glasses = await GlassesService.updateGlasses(req.params.id, data);
        if (!glasses) {
            return res.status(404).json({
                status: "error",
                message: "Glasses not found"
            });
        }
        res.status(200).json({
            status: "success",
            data: glasses
        });
    } catch (error) {
        res.status(400).json({ 
            status: "error",
            message: error.message 
        });
    }
};

const searchGlasses = async (req, res) => {
    try {
        const glasses = await GlassesService.searchGlasses(req.query);
       res.send(
           glasses
        )
    } catch (error) {
        res.status(400).json({ 
            status: "error",
            message: error.message 
        });
    }
};

const deleteGlasses = async (req, res) => {
    try {
        const deleted = await GlassesService.deleteGlasses(req.params.id);
        if (!deleted) {
            return res.status(404).json({
                status: "error",
                message: "Glasses not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "Glasses deleted successfully"
        });
    } catch (error) {
        res.status(400).json({ 
            status: "error",
            message: error.message 
        });
    }
};

const getAllGlasses = async (req, res) => {
    try {
        const glasses = await GlassesService.getAllGlasses();
        res.send(
           glasses
        )
    } catch (error) {
        res.status(400).json({ 
            status: "error",
            message: error.message 
        });
    }
};

const getGlassesById = async (req, res) => {
    try {
        const glasses = await GlassesService.getGlassesById(req.params.id);
        if (!glasses) {
            return res.status(404).json({
                status: "error",
                message: "Glasses not found"
            });
        }
        res.status(200).json({
            status: "success",
            data: glasses
        });
    } catch (error) {
        res.status(400).json({ 
            status: "error",
            message: error.message 
        });
    }
};

const getBestSellers = async (req, res) => {
    try {
        const glasses = await GlassesService.getBestSellers();
       res.send(
           glasses
        )
    } catch (error) {
        res.status(400).json({ 
            status: "error",
            message: error.message 
        });
    }
};

const getNewArrivals = async (req, res) => {
    try {
        const glasses = await GlassesService.getNewArrivals();
        res.send(
           glasses
        )
    } catch (error) {
        res.status(400).json({ 
            status: "error",
            message: error.message 
        });
    }
};

const getTryOnGlasses = async (req, res) => {
    try {
        const glasses = await GlassesService.getTryOnGlasses();
        res.send(
           glasses
        )
    } catch (error) {
        res.status(400).json({ 
            status: "error",
            message: error.message 
        });
    }
};

module.exports = {
    addGlasses,
    updateGlasses,
    searchGlasses,
    deleteGlasses,
    getAllGlasses,
    getGlassesById,
    getBestSellers,
    getNewArrivals,
    getTryOnGlasses
};
