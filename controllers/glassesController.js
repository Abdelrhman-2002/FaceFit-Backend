const GlassesService = require("../services/glassesService");

const addGlasses = async (req, res) => {
    try {
        const glasses = await GlassesService.addGlasses(req.body);
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
        const glasses = await GlassesService.updateGlasses(req.params.id, req.body);
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
        res.status(200).json({
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

const getNewArrivals = async (req, res) => {
    try {
        const glasses = await GlassesService.getNewArrivals();
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

const getTryOnGlasses = async (req, res) => {
    try {
        const glasses = await GlassesService.getTryOnGlasses();
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

module.exports = {
    addGlasses,
    updateGlasses,
    searchGlasses,
    deleteGlasses,
    getAllGlasses,
    getBestSellers,
    getNewArrivals,
    getTryOnGlasses
};
