const Glasses = require("../models/Glasses");

const create = async (data) => {
    return await Glasses.create(data);
};

const update = async (id, data) => {
    return await Glasses.findByIdAndUpdate(id, data, { new: true });
};

const search = async (query) => {
    const searchCriteria = {};
    for (const key in query) {
        searchCriteria[key] = { $regex: query[key], $options: "i" };
    }
    if (query.gender) {
        searchCriteria.gender = query.gender;
    }
    return await Glasses.find(searchCriteria);
};

const deleteGlasses = async (id) => {
    return await Glasses.findByIdAndDelete(id);
};

const getAll = async () => {
    return await Glasses.find();
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
    getBestSellers,
    getNewArrivals,
};
