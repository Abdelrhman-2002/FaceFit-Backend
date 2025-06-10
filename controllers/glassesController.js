const GlassesService = require("../services/glassesService");

const addGlasses = async (req, res) => {
    try {
        // Process uploaded files if any
        const data = { ...req.body };
        
        // Convert string values to appropriate types
        if (data.price) data.price = parseFloat(data.price);
        if (data.stock) data.stock = parseInt(data.stock);
        if (data.weight) data.weight = parseFloat(data.weight);
        
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
            
            // Helper function to check for and process model files with various naming conventions
            const processModelFile = (req, fieldNameCamel, fieldNameHyphen, fieldNameLower) => {
                // Check each possible variant of the field name
                if (req.files[fieldNameCamel] || 
                    req.files[fieldNameHyphen] || 
                    req.files[fieldNameLower]) {
                    
                    // Return the first available file's path
                    if (req.files[fieldNameCamel]) {
                        return req.files[fieldNameCamel][0].path;
                    } else if (req.files[fieldNameHyphen]) {
                        return req.files[fieldNameHyphen][0].path;
                    } else if (req.files[fieldNameLower]) {
                        return req.files[fieldNameLower][0].path;
                    }
                }
                return null;
            };
            
            // Process AR model files using our helper function
            const armsOBJPath = processModelFile(req, 'modelArmsOBJ', 'model-arms-obj', 'modelarmsobj');
            if (armsOBJPath) {
                data.arModels.modelArmsOBJ = armsOBJPath;
                data.tryOn = true;
            }

            const armsMTLPath = processModelFile(req, 'modelArmsMTL', 'model-arms-mtl', 'modelarmsmtl');
            if (armsMTLPath) {
                data.arModels.modelArmsMTL = armsMTLPath;
            }

            const lensesOBJPath = processModelFile(req, 'modelLensesOBJ', 'model-lenses-obj', 'modellensesobj');
            if (lensesOBJPath) {
                data.arModels.modelLensesOBJ = lensesOBJPath;
                data.tryOn = true;
            }

            const lensesMTLPath = processModelFile(req, 'modelLensesMTL', 'model-lenses-mtl', 'modellensesmtl');
            if (lensesMTLPath) {
                data.arModels.modelLensesMTL = lensesMTLPath;
            }

            const frameOBJPath = processModelFile(req, 'modelFrameOBJ', 'model-frame-obj', 'modelframeobj');
            if (frameOBJPath) {
                data.arModels.modelFrameOBJ = frameOBJPath;
                data.tryOn = true;
            }

            const frameMTLPath = processModelFile(req, 'modelFrameMTL', 'model-frame-mtl', 'modelframemtl');
            if (frameMTLPath) {
                data.arModels.modelFrameMTL = frameMTLPath;
            }
            
            // Process material images with all possible naming conventions
            if (req.files.modelArmsMaterial || req.files['model-arms-material'] || req.files.modelarmsmaterial) {
                let materialFiles;
                if (req.files.modelArmsMaterial) {
                    materialFiles = req.files.modelArmsMaterial;
                } else if (req.files['model-arms-material']) {
                    materialFiles = req.files['model-arms-material'];
                } else if (req.files.modelarmsmaterial) {
                    materialFiles = req.files.modelarmsmaterial;
                }
                
                if (materialFiles) {
                    const materialPaths = materialFiles.map(file => file.path);
                    data.arModels.modelArmsMaterial = materialPaths;
                }
            }
            
            if (req.files.modelFrameMaterial || req.files['model-frame-material'] || req.files.modelframematerial) {
                let materialFiles;
                if (req.files.modelFrameMaterial) {
                    materialFiles = req.files.modelFrameMaterial;
                } else if (req.files['model-frame-material']) {
                    materialFiles = req.files['model-frame-material'];
                } else if (req.files.modelframematerial) {
                    materialFiles = req.files.modelframematerial;
                }
                
                if (materialFiles) {
                    const materialPaths = materialFiles.map(file => file.path);
                    data.arModels.modelFrameMaterial = materialPaths;
                }
            }
        }
        
        // Convert tryOn string to boolean if needed
        if (typeof data.tryOn === 'string') {
            data.tryOn = data.tryOn === 'true';
        }
        
        // Convert colors JSON string back to array if needed
        if (typeof data.colors === 'string') {
            try {
                // Check if it's a JSON string
                if (data.colors.startsWith('[')) {
                    data.colors = JSON.parse(data.colors);
                } else {
                    // Split by comma if it's a comma-separated string
                    data.colors = data.colors.split(',').map(color => color.trim()).filter(color => color);
                }
            } catch (e) {
                console.error('Error parsing colors:', e);
                return res.status(400).json({
                    status: "error",
                    message: "Invalid colors format"
                });
            }
        }
        
        const glasses = await GlassesService.addGlasses(data);
        res.status(201).json({
            status: "success",
            data: glasses
        });
    } catch (error) {
        console.error("Error adding glasses:", error);
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
        
        // Convert string values to appropriate types
        if (data.price) data.price = parseFloat(data.price);
        if (data.stock) data.stock = parseInt(data.stock);
        if (data.weight) data.weight = parseFloat(data.weight);
        
        // Initialize arModels if needed
        if (!data.arModels) {
            data.arModels = {};
        }
        
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
            
            // Helper function to check for and process model files with various naming conventions
            const processModelFile = (req, fieldNameCamel, fieldNameHyphen, fieldNameLower) => {
                // Check each possible variant of the field name
                if (req.files[fieldNameCamel] || 
                    req.files[fieldNameHyphen] || 
                    req.files[fieldNameLower]) {
                
                    // Return the first available file's path
                    if (req.files[fieldNameCamel]) {
                        return req.files[fieldNameCamel][0].path;
                    } else if (req.files[fieldNameHyphen]) {
                        return req.files[fieldNameHyphen][0].path;
                    } else if (req.files[fieldNameLower]) {
                        return req.files[fieldNameLower][0].path;
                    }
                }
                return null;
            };
            
            // Process AR model files using our helper function
            const armsOBJPath = processModelFile(req, 'modelArmsOBJ', 'model-arms-obj', 'modelarmsobj');
            if (armsOBJPath) {
                data.arModels.modelArmsOBJ = armsOBJPath;
                data.tryOn = true;
            }

            const armsMTLPath = processModelFile(req, 'modelArmsMTL', 'model-arms-mtl', 'modelarmsmtl');
            if (armsMTLPath) {
                data.arModels.modelArmsMTL = armsMTLPath;
            }

            const lensesOBJPath = processModelFile(req, 'modelLensesOBJ', 'model-lenses-obj', 'modellensesobj');
            if (lensesOBJPath) {
                data.arModels.modelLensesOBJ = lensesOBJPath;
                data.tryOn = true;
            }

            const lensesMTLPath = processModelFile(req, 'modelLensesMTL', 'model-lenses-mtl', 'modellensesmtl');
            if (lensesMTLPath) {
                data.arModels.modelLensesMTL = lensesMTLPath;
            }

            const frameOBJPath = processModelFile(req, 'modelFrameOBJ', 'model-frame-obj', 'modelframeobj');
            if (frameOBJPath) {
                data.arModels.modelFrameOBJ = frameOBJPath;
                data.tryOn = true;
            }

            const frameMTLPath = processModelFile(req, 'modelFrameMTL', 'model-frame-mtl', 'modelframemtl');
            if (frameMTLPath) {
                data.arModels.modelFrameMTL = frameMTLPath;
            }
            
            // Process material images with all possible naming conventions
            if (req.files.modelArmsMaterial || req.files['model-arms-material'] || req.files.modelarmsmaterial) {
                let materialFiles;
                if (req.files.modelArmsMaterial) {
                    materialFiles = req.files.modelArmsMaterial;
                } else if (req.files['model-arms-material']) {
                    materialFiles = req.files['model-arms-material'];
                } else if (req.files.modelarmsmaterial) {
                    materialFiles = req.files.modelarmsmaterial;
                }
                
                if (materialFiles) {
                    const materialPaths = materialFiles.map(file => file.path);
                    data.arModels.modelArmsMaterial = materialPaths;
                }
            }
            
            if (req.files.modelFrameMaterial || req.files['model-frame-material'] || req.files.modelframematerial) {
                let materialFiles;
                if (req.files.modelFrameMaterial) {
                    materialFiles = req.files.modelFrameMaterial;
                } else if (req.files['model-frame-material']) {
                    materialFiles = req.files['model-frame-material'];
                } else if (req.files.modelframematerial) {
                    materialFiles = req.files.modelframematerial;
                }
                
                if (materialFiles) {
                    const materialPaths = materialFiles.map(file => file.path);
                    data.arModels.modelFrameMaterial = materialPaths;
                }
            }
        }
        
        // Convert tryOn string to boolean if needed
        if (typeof data.tryOn === 'string') {
            data.tryOn = data.tryOn === 'true';
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
        if (typeof data.colors === 'string') {
            try {
                // Check if it's a JSON string
                if (data.colors.startsWith('[')) {
                    data.colors = JSON.parse(data.colors);
                } else {
                    // Split by comma if it's a comma-separated string
                    data.colors = data.colors.split(',').map(color => color.trim()).filter(color => color);
                }
            } catch (e) {
                console.error('Error parsing colors:', e);
                return res.status(400).json({
                    status: "error",
                    message: "Invalid colors format"
                });
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
        console.error("Error updating glasses:", error);
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
