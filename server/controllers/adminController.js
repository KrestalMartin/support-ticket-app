const Ticket = require('../models/Ticket');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc    Get all open tickets
// @route   GET /api/admin/tickets
// @access  Private/Admin
exports.getOpenTickets = asyncHandler(async (req, res, next) => {
    const tickets = await Ticket.find({ status: { $ne: 'Closed' } })
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: tickets.length,
        data: tickets
    });
});

// @desc    Update ticket status
// @route   PUT /api/admin/tickets/:id
// @access  Private/Admin
exports.updateTicketStatus = asyncHandler(async (req, res, next) => {
    let ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        return next(
            new ErrorResponse(`Ticket not found with id of ${req.params.id}`, 404)
        );
    }

    ticket = await Ticket.findByIdAndUpdate(req.params.id, { status: req.body.status }, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: ticket
    });
});