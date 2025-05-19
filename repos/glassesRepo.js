const Glasses = require("../models/Glasses");
const { ObjectId } = require('mongoose').Types;

const create = async (data) => {
    return await Glasses.create(data);
};

const update = async (id, data) => {
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
