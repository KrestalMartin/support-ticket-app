const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    console.log('[REGISTER] Incoming data:', req.body);
    try {
        // Create user, allow role to be set if provided (for admin registration)
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'user'
        });
        console.log('[REGISTER] User created:', user.email, 'Role:', user.role);
        sendTokenResponse(user, 200, res);
    } catch (err) {
        console.error('[REGISTER] Registration error:', err);
        // If duplicate key error
        if (err.code === 11000) {
            return next(new ErrorResponse('Email already exists', 400));
        }
        // Validation error
        if (err.name === 'ValidationError') {
            return next(new ErrorResponse(err.message, 400));
        }
        return next(new ErrorResponse('Registration failed', 500));
    }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    sendTokenResponse(user, 200, res);
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: user
    });
});

// @desc    Logout user
// @route   GET /api/auth/logout
// @access  Public
exports.logout = (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        data: {}
    });
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    // Remove password from user object before sending
    const userObj = user.toObject();
    delete userObj.password;

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            role: user.role,
            user: userObj
        });
};