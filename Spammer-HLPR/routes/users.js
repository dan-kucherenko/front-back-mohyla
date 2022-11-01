"use strict";
const router = require('express').Router();
const controller = require('../controllers/users');


// GET func for main page
router.get('/', controller.getMainPage);

// GET func for all elements
router.get('/show-users', controller.getUsers);

// POST func for sending e-mail
router.post('/send-email', controller.sendEmail);

// POST func
router.post('/add-user', controller.addUserForMail);

// DELETE func
router.delete('/delete-user', controller.removeUser);

// UPDATE func
router.patch('/update-email', controller.updateUserEmail);

module.exports = router;