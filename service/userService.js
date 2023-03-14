const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const UserProfile = require('../model/userProfileModel');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const filterProfile = (user) => {
  const userfinal = {
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    description: user.profile.description,
    date_birth: user.profile.date_birth,
    work: user.profile.work,
    city: user.profile.city,
    experience: [],
    soft_skill: [],
  };
    user.profile.experience.forEach((experience) => {
      const exp = {
        name: experience.name,
        date_start: new Date(experience.date_start).toLocaleDateString(),
        date_end: experience.date_end ? new Date(experience.date_end).toLocaleDateString() : "",
        description: experience.description,
        place: experience.place,
        uuid: experience.uuid
      };
      userfinal.experience.push(exp);
    });
    user.profile.soft_skill.forEach((soft_skill) => {
      const sftskl = {
        name: soft_skill.name,
        description: soft_skill.description,
        uuid: soft_skill.uuid
      };
      userfinal.soft_skill.push(sftskl);
    });
    return userfinal;
  }

const getUserProfileById = async (uuid) => {
    const result = await User.findOne({ uuid: uuid }).populate('profile');
    if (!result) {
      return { error: 'user not found' };
    }
    const filteredProfile = filterProfile(result);
    if (filteredProfile.date_birth) {
      filteredProfile.date_birth = filteredProfile.date_birth.toISOString().slice(0, 10); // format : "yyyy-mm-dd"
    }
    return filteredProfile;
  };

  const updateProfile = async (data) => {

    const userfullData = await User.findOne({ uuid: data.user }).populate('profile');
    if (!userfullData) {
      return { error: "utilisateur introuvable" };
    }

    console.log(userfullData, "hello");
    userfullData.username = data.username;
    userfullData.avatar = data.avatar;
    userfullData.firstname = data.firstname;
    userfullData.lastname = data.lastname;
    userfullData.email = data.email;

    userfullData.oldPassword = await bcrypt.hash(data.oldPassword, 10);
    userfullData.newPassword = data.newPassword;
    userfullData.confirmPassword = data.confirmPassword;

    console.log(data.date_birth);
    console.log(userfullData.oldPassword !== userfullData.password);
    // Vérifier que l'ancien mot de passe est correct avant de mettre à jour le nouveau mot de passe
    if (userfullData.oldPassword === "") {
      if (userfullData.oldPassword !== userfullData.password) {
        return { error: "Ancien mot de passe incorrect" };
      }

      // Vérifier que le nouveau mot de passe et la confirmation correspondent
      if (userfullData.newPassword !== userfullData.confirmPassword) {
        return { error: "La confirmation du mot de passe ne correspond pas" };
      }

      // Hacher le nouveau mot de passe avant de le stocker dans la base de données
      const hashedPassword = await bcrypt.hash(data.newPassword, 10);
      userfullData.password = hashedPassword;
    }

    try {
      await userfullData.save();
    } catch (error) {
      return { error: error.messages };
    }

    const userProfileFullData = userfullData.profile;
    if (!userProfileFullData) {
      return { error: "Impossible de trouver l'utilisateur spécifié" };
    }

    if (data.description) {
      userProfileFullData.description = data.description;
    }
    userProfileFullData.work = data.work;
    userProfileFullData.city = data.city;
    if (data.date_birth !== "") {
      const dateOfBirth = new Date(data.date_birth);
      console.log(dateOfBirth);
      if (!isNaN(dateOfBirth)) {
        userProfileFullData.date_birth = dateOfBirth.toISOString("fr");
      }
    }
    try {
      await userProfileFullData.save();
    } catch (error) {
      return { error: error.message };
    }
    return { success: "Utilisateur et profil mis à jour" };
  };

module.exports = {
  getUserProfileById,
  updateProfile
}