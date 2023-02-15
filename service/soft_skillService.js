const UserProfile = require('../model/userProfileModel');
const { v4: uuidv4 } = require('uuid');

const postOneSoft_skill = async (data) => {
    const {soft_skill} = data;
    const {uuid_user} = data;

    const userProfile = await UserProfile.findOne({uuid_user : uuid_user});
    if(userProfile){
        soft_skill[0].uuid = uuidv4();
        userProfile.soft_skill.push(soft_skill[0]);
        await userProfile.save(function (err,doc){
            if(err){
                return err
            }
        });
        return {"succes":'soft_skill added in user_profile of specified user '}
    } else {
        return {"error":"can't find profile of specified user"}
    }
}

const updateOneSoft_skill = async (data) => {
    const {soft_skill} = data;
    const {uuid_user} = data;

    const userProfile = await UserProfile.findOne({uuid_user : uuid_user});
    if(userProfile){
        console.log(soft_skill)
        const found = userProfile.soft_skill.findIndex(e => e.uuid === soft_skill[0].uuid);
        if(found >=0){
            userProfile.soft_skill[found] = soft_skill[0];
            await userProfile.save(function (err,doc){
                if(err){
                    return err
                }
            });
        } else {
            return {"error":"can't find specified soft_skill in user_profil of specified user"}
        }
        
        return {"succes":'specified soft_skill updated in user_profile of specified user '}
    } else {
        return {"error":"can't find profile of specified user"}
    }
}


module.exports = {
    postOneSoft_skill,
    updateOneSoft_skill
}