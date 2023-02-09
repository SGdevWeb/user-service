const { validationResult } = require('express-validator');
const testService = require('../service/testService')

//test
const testController = async (req, res) =>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {name} = req.body;
        return res.status(200).json({ name: await testService.getLastnameFromFirstname(name) });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    testController,
}