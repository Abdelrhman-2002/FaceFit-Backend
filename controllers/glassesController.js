const GlassesService = require("../services/glassesService");

const addGlasses = async (req, res) => {
    try {
        const glasses = await GlassesService.addGlasses(req.body);
        res.status(201).json(glasses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateGlasses = async (req, res) => {
    try {
        const glasses = await GlassesService.updateGlasses(req.params.id, req.body);
        res.status(200).json(glasses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const searchGlasses = async (req, res) => {
    try {
        const glasses = await GlassesService.searchGlasses(req.query);
        res.status(200).json(glasses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteGlasses = async (req, res) => {
    try {
        await GlassesService.deleteGlasses(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllGlasses = async (req, res) => {
    try {
        const glasses = await GlassesService.getAllGlasses();
        res.status(200).json(glasses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    addGlasses,
    updateGlasses,
    searchGlasses,
    deleteGlasses,
    getAllGlasses,
};
