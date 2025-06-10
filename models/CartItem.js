const mongoose = require("mongoose");
const Prescription = require("./Prescription");

const cartItemSchema = new mongoose.Schema({
  counter: {
    type: Number,
    required: true,
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Glasses",
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  lenseType: {
    type: String,
    enum: ["No-Prescription", "Prescription"],
    required: true,
  },
  lensSpecification: {
    type: String,
    enum: ["Standard Eyeglass Lenses", "Blue Light Blocking", "Driving Lenses"],
    required: function() { return this.lenseType === "Prescription"; }
  },
  lensPrice: {
    type: Number,
    default: 50,
    required: function() { return this.lenseType === "Prescription"; }
  },
  prescription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prescription",
  },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;