const getEmail = async (data)=> {
    const {email} =data;
    const result = []
    await User.find({email: email}).then(data => {
        data.forEach((user) =>{
            resultuser.push(user.email);
        })
    });
    return result;
};