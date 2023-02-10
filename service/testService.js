const User = require('../model/userModel');
const { v4: uuidv4 } = require('uuid');

const getLastnameFromFirstname = async (data)=> {
    const {name} =data;
    const resultuser = []
    await User.find({firstname: name}).then(data => {
        data.forEach((user) =>{
            resultuser.push(user.lastname);
        })
    });
    return resultuser;
};

const postUserTest = async (data) => {
    const {email} = data;
    const {password} = data;
    const {username} = data;
    const {firstname} = data;
    const {lastname} = data;

    const user = new User({
        uuid : uuidv4(),
        email : email,
        password : password,
        username : username,
        firstname : firstname,
        lastname : lastname
    });
    await user.save(function (err,doc){
        console.log(doc._id);
    });
    return {"succes":'user added in the database'}
};

module.exports = {
    getLastnameFromFirstname,
    postUserTest
}