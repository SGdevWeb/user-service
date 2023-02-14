const { validationResult } = require('express-validator');
const userService = require('../service/userService');

const userProfileGetController = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const test = await testService.getTestById(req.params.id);
        if (test.error) {
            return res.status(404).json({ error: test.error });
        }
        return res.status(200).json({ lastname: test.lastname, username: test.username, firstname: test.firstname });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    userProfileGetController,
}