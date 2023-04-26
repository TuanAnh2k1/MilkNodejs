const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
    tenchuthe: {
        type: String,
        required: true,
    },
    kieuthe: {
        type: String,
        required: true,
    },
    sothe: {
        type: String,
        required: true,
    },
    socvd: {
        type: String,
        required: true,
    },
    ngayhethan: {
        type: String,
        required: true,
    },
    sotienphaitra: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model("Card", CardSchema);