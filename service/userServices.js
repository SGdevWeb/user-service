const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const User = require("../model/userModel");
const User_profile = require("../model/userProfileModel");

const createUser = async (reqBody) => {
  //   console.log("createUser");
  const userProfileUuid = uuidv4();
  const userUuid = uuidv4();

  const userProfile = new User_profile({
    uuid: userProfileUuid,
    description: "",
    date_birth: "",
    city: "",
    work: "",
    experience: [],
    soft_skill: [],
    uuid_user: userUuid,
  });

  try {
    // console.log("userProfileSave");
    await userProfile.save();
    const profile = await User_profile.findOne({ uuid: userProfileUuid });
    // console.log("profile", profile._id);
    const hash = await bcrypt.hash(reqBody.password, 10);
    const user = new User({
      uuid: userUuid,
      email: reqBody.email,
      lastname: reqBody.lastname,
      firstname: reqBody.firstname,
      username: reqBody.username,
      password: hash,
      avatar:
        "https://img.freepik.com/vecteurs-libre/illustration-vectorielle-realiste-medias-sociaux-emoji-emoticon_587448-1120.jpg?w=1380&t=st=1677605349~exp=1677605949~hmac=22db999ce40cfd8a3ec5a4a643aead7ee5a62993d200badb3dcf6a718813fc2d",
      role: "user",
      profile: profile._id,
    });
    // console.log("userSave");
    const response = await user.save();
    // console.log("response", response);
    return { success: true, message: "Utilisateur créé !" };
  } catch (error) {
    return { success: false, error };
  }
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Paire login/mot de passe incorrecte");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Paire login/mot de passe incorrecte");
    }
    const payload = {
      expiresIn: "1h",
      sub: {
        username: user.username,
        avatar: user.avatar,
        uuid: user.uuid,
      },
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_KEY);
    return { token: token };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const response = await User.find();
    return response;
  } catch (error) {
    throw error;
  }
};

const getAllProfileUsers = async () => {
  try {
    const response = await User.find().populate("profile");
    return response;
  } catch (error) {
    throw error;
  }
};

const getUser = async (uuid) => {
  console.log("entra a userService", uuid);
  try {
    const user = await User.findOne({ uuid: uuid }).populate("profile");
    console.log("user:", user);
    if (!user) {
      throw new Error("Utilisateur introuvable");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  login,
  getAllUsers,
  getAllProfileUsers,
  getUser,
};
