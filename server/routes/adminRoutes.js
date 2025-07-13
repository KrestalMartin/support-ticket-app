const express = require('express');
const router = express.Router();
const {
    getOpenTickets,
    updateTicketStatus
} = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');

// Admin routes
router.use(isAuthenticated);
router.use(isAdmin);

router.route('/tickets')
    .get(getOpenTickets);

router.route('/tickets/:id')
    .put(updateTicketStatus);

module.exports = router;