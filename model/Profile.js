const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
    sdt: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});
module.exports = mongoose.model("Profile", ProfileSchema);