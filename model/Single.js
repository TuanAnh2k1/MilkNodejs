const mongoose = require("mongoose");
const SingleSchema = new mongoose.Schema({
    idMilk: {
        type: String,
        required: true,
    },
    idUser: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    describe: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    supplier: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    is_Star: {
        type: Number,
        require: false,
        default: 0,
    }
});

module.exports = mongoose.model("Single", SingleSchema);