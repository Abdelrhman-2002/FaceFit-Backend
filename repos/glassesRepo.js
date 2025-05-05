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

module.exports = {
    create,
    update,
    search,
    delete: deleteGlasses,
    getAll,
};
