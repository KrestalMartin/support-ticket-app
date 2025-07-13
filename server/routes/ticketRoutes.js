const express = require('express');
const router = express.Router();
const {
    createTicket,
    getUserTickets
} = require('../controllers/ticketController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.use(isAuthenticated);

router.route('/')
    .post(createTicket);

router.route('/user')
    .get(getUserTickets);

module.exports = router;