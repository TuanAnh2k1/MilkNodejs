const mongoose = require("mongoose");
const MilkSchema = new mongoose.Schema({
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
    price: {
        type: String,
        required: true,
    },
    supplier: {
        type: String,
        required: true,
    },
    total: {
        type: String,
        required: true,
    },
    star: {
        type: Array,
        required: false,
        default: [],
    }
});

module.exports = mongoose.model("Milk", MilkSchema);