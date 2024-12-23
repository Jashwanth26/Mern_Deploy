const devuser = require('../models/devusermodel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

// Register new user
exports.registerUser = async (req, res) => {
    try {
        const { fullname, email, mobile, skill, password, confirmpassword } = req.body;
        const exist = await devuser.findOne({ email });
        if (exist) {
            return res.status(400).send('User already Registered');
        }
        if (password !== confirmpassword) {
            return res.status(403).send('Password Invalid');
        }

        let newUser = new devuser({
            fullname,
            email,
            mobile,
            skill,
            password: await bcrypt.hash(password, 10)
        });
        await newUser.save();
        return res.status(200).send('User Registered successfully');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server Error');
    }
};

// Login existing user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const exist = await devuser.findOne({ email });
        if (!exist) {
            return res.status(400).send('User not exist');
        }
        if (!(await bcrypt.compare(password, exist.password))) {
            return res.status(400).send('Password Invalid');
        }

        let payload = {
            user: {
                id: exist.id,
                fullname: exist.fullname,
                email: exist.email
            }
        };

        jwt.sign(payload, 'jwtPassword', { expiresIn: 360000000 }, (err, token) => {
            if (err) throw err;
            return res.json({ token, user: { fullname: exist.fullname, email: exist.email } });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
};

const otpStore = {};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const exist = await devuser.findOne({ email });
        if (!exist) {
            return res.status(400).send('User not found');
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
        otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // Valid for 5 minutes

        // Generate JWT token for temporary validation
        const token = jwt.sign({ email }, 'temporarySecret', { expiresIn: '15m' });

        // Send OTP email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jashwanth.aerospace@gmail.com',
                pass: 'fyzk weta xkuy niik',
            }
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is ${otp}. It is valid for 5 minutes.`,
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'OTP sent to email', token });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error');
    }
};

exports.validateOtp = async (req, res) => {
    try {
        const { otp, token } = req.body;

        // Verify the token and extract the email
        const decoded = jwt.verify(token, 'temporarySecret');
        const email = decoded.email;

        if (!otpStore[email]) {
            return res.status(400).send('Invalid or expired OTP');
        }

        const { otp: storedOtp, expiresAt } = otpStore[email];
        if (storedOtp !== parseInt(otp) || Date.now() > expiresAt) {
            return res.status(400).send('Invalid or expired OTP');
        }

        // OTP is valid; clear from store
        delete otpStore[email];

        return res.status(200).json({ message: 'OTP validated successfully', token });
    } catch (err) {
        console.error(err);
        if (err.name === 'TokenExpiredError') {
            return res.status(400).send('Token expired. Please request a new OTP.');
        }
        return res.status(500).send('Server Error');
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.status(400).send('Passwords do not match');
        }

        // Verify token and extract email
        const decoded = jwt.verify(token, 'temporarySecret');
        const email = decoded.email;

        const exist = await devuser.findOne({ email });
        if (!exist) {
            return res.status(400).send('User not found');
        }

        // Update password
        exist.password = await bcrypt.hash(newPassword, 10);
        await exist.save();

        return res.status(200).send('Password updated successfully');
    } catch (err) {
        console.error(err);
        if (err.name === 'TokenExpiredError') {
            return res.status(400).send('Token expired. Please try again.');
        }
        return res.status(500).send('Server Error');
    }
};


// Get all profiles
exports.getAllProfiles = async (req, res) => {
    try {
        let allprofiles = await devuser.find();
        return res.json(allprofiles);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
};

// Get my profile
exports.getMyProfile = async (req, res) => {
    try {
        let user = await devuser.findById(req.user.id);
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server Error');
    }
};
