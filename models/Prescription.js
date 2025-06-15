const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    OS:{
        SPH: { type: Number, required: true },
        CYL: { type: Number, required: true },
        AXIS: { type: Number, required: true },
    },
    OD:{
        SPH: { type: Number, required: true },
        CYL: { type: Number, required: true },
        AXIS: { type: Number, required: true },
    },
    PD: {
        type: {
            singlePD: { type: Number },
            dualPD: {
                left: { type: Number },
                right: { type: Number }
            }
        },
        required: true
    }
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;