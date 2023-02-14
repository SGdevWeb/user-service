const mongoose = require("mongoose");

const experienceSchema = mongoose.Schema({
    name : String,
    date_start : { type : Date },
    date_end : { type : Date },
    description : String,
    place : String,
    uuid : String
    
});

const soft_skillSchema = mongoose.Schema({
    name : String,
    description : String
});


const userProfileSchema = mongoose.Schema({
    id : Number,
    uuid: String,
    description: String,
    date_birth: { type: Date},
    city: String,
    work: String,
    experience: [ { type : experienceSchema } ],
    soft_skill: [ { type : soft_skillSchema } ],
    uuid_user: String,
});

module.exports = mongoose.model("user_profile",userProfileSchema);