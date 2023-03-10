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
            date_start: experience.date_start,
            date_end: experience.date_end,
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
        const { user, user_profile  } = data;
        const userfullData = await User.findOne( {uuid : user.user} ).populate('profile');
        if (!userfullData) {
          return { error: "utilisateur introuvable" };
        }
      
        userfullData.username = user_profile.username;
        userfullData.avatar = user_profile.avatar;
        userfullData.firstname = user_profile.firstname;
        userfullData.lastname = user_profile.lastname;
        userfullData.email = user_profile.email;
        userfullData.oldPassword = user_profile.password;
        userfullData.newPassword = user_profile.newPassword;
        userfullData.confirmPassword = user_profile.confirmPassword;
      
        // // Vérifier si l'email existe déjà
        // const emailExists = await userService.emailExists(email);
        // if (emailExists) {
        //   return { error: "Cet email est déjà associé à un autre compte" };
        // }
      
        // Vérifier que l'ancien mot de passe est correct avant de mettre à jour le nouveau mot de passe
        if (user_profile.oldPassword && user_profile.newPassword && user_profile.confirmPassword) {
          const passwordMatch = await bcrypt.compare(oldPassword, userfullData.password);
          if (!passwordMatch) {
            return { error: "Ancien mot de passe incorrect" };
          }
      
          // Vérifier que le nouveau mot de passe et la confirmation correspondent
          if (newPassword !== confirmPassword) {
            return { error: "La confirmation du mot de passe ne correspond pas" };
          }
      
          // Hacher le nouveau mot de passe avant de le stocker dans la base de données
          console.log(newPassword);
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          console.log(hashedPassword);
          userfullData.password = hashedPassword;
          console.log(userfullData.password);
        }
      
        try {
          await userfullData.save();
        } catch (error) {
          return {error: error.message};
        }
      
        const userProfileFullData = userfullData.profile;
        if (!userProfileFullData) {
          return { error: "Impossible de trouver l'utilisateur spécifié" };
        }
      
        userProfileFullData.description = user_profile.description;
        userProfileFullData.work = user_profile.work;
        userProfileFullData.date_birth = new Date(user_profile.date_birth).toISOString().substring(0, 10);
        userProfileFullData.city = user_profile.city;
        try {
          await userProfileFullData.save();
        } catch (error) {
          return {error : error.message};
        }
      
        return { success: "Utilisateur et profil mis à jour" };
      };

module.exports = {
    getUserProfileById,
    updateProfile
}