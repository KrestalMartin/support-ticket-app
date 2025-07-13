const express = require('express');
const router = express.Router();
const {
    register,
    login,
    getMe,
    logout
} = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', isAuthenticated, getMe);


module.exports = router;