const mongoose = require("mongoose");

<<<<<<< HEAD
//schéma de la data des collections 
const userSchema = mongoose.Schema({
=======
//schéma de la data des collections
const userSchema = mongoose.Schema(
  {
    id: Number,
>>>>>>> cbad71110fc8df62619cf4940b161c15444a2d90
    uuid: String,
    email: { type: String, unique: true },
    password: String,
    // date_create: { type: Date },
    firstname: String,
    lastname: String,
    username: String,
    avatar: String,
    private: Boolean,
    role: String,
    // role: {
    //     admin: Boolean,
    //     user_role: Boolean
    // },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "user_profile" },
  },
  {
    timestamps: true,
  }
);
//nom de la collection  = nom du model+s exepemple nom du model : user, nom de la collections : users
module.exports = mongoose.model("user", userSchema);
