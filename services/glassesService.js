const GlassesRepo = require("../repos/glassesRepo");

const addGlasses = async (data) => {
    return await GlassesRepo.create(data);
};

const updateGlasses = async (id, data) => {
    return await GlassesRepo.update(id, data);
};

const searchGlasses = async (query) => {
    return await GlassesRepo.search(query);
};

const deleteGlasses = async (id) => {
    return await GlassesRepo.delete(id);
};

const getAllGlasses = async () => {
    return await GlassesRepo.getAll();
};

const getBestSellers = async () => {
    return await GlassesRepo.getBestSellers();
};

const getNewArrivals = async () => {
    return await GlassesRepo.getNewArrivals();
};

const getTryOnGlasses = async () => {
    return await GlassesRepo.search({ tryOn: true });
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

