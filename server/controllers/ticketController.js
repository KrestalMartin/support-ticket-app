const Ticket = require('../models/Ticket');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc    Create ticket
// @route   POST /api/tickets
// @access  Private
exports.createTicket = asyncHandler(async (req, res, next) => {
    // Add user to req.body
    req.body.user = req.user.id;
    req.body.name = req.user.name;
    req.body.email = req.user.email;

    const ticket = await Ticket.create(req.body);

    res.status(201).json({
        success: true,
        data: ticket
    });
});

// @desc    Get user tickets
// @route   GET /api/tickets/user
// @access  Private
exports.getUserTickets = asyncHandler(async (req, res, next) => {
    const tickets = await Ticket.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        count: tickets.length,
        data: tickets
    });
});