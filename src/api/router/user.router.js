const router = require('express').Router();
const { createUsers, getUsers } = require('../controller/user.controller');

router.post('/createUser',createUsers);
router.get('/getUsers',getUsers);

module.exports = router