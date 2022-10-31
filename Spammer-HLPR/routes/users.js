"use strict"
const router = require('express').Router();
const controller = require('../controllers/users');

// GET func for all elements
router.get('/show_users', controller.getUsers);

// POST func
router.post('/add_user', controller.addUserForMail);

// DELETE func
router.delete('/delete_user', controller.removeUser);

// UPDATE func
router.patch('/', controller.updateUserEmail);

module.exports = router;