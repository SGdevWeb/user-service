const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    id : Number,
    uuid: String,
    email: String,
    password: String,
    date_create: { type: Date},
    firstname: String,
    lastname: String,
    username: String,
    avatar: String,
    private: Boolean,
    role: {
        admin: Boolean,
        user_role: Boolean
    },
});

module.exports = mongoose.model("user",userSchema)
