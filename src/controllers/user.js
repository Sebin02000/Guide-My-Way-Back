// User login and signup with email and password


const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail =require('./mail');
const { token } = require('morgan');
const apiResponse = require('../helpers/apiResponse');

// validateSignupInput
function validateSignupInput(data) {
    const errors = {};
    if (data.name === undefined) {

        errors.name = 'Name field is required';
    }
   
    if (data.email === undefined) {
        errors.email = 'Email field is required';
    }
    if (data.password === undefined) {
        errors.password = 'Password field is required';
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}
// validateLoginInput
function validateLoginInput(data) {
    const errors = {};
    if (data.email === undefined) {
        errors.email = 'Email field is required';
    }
    if (data.password === undefined) {
        errors.password = 'Password field is required';
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}


// Signup
exports.signup = (req, res) => {

    // Check for registration errors
    const { errors, isValid } = validateSignupInput(req.body);
console.log(req.body);
    // Check validation
    if (!isValid) {
        return apiResponse.errorResponse(res, "Validation Error.", errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return apiResponse.errorResponse(res, "Email already exists.");
            } else {
                // genaret jwt token
                const token = jwt.sign({ _id: req.body.email }, process.env.JWT_SECRET);
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    token:token
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                const mailObj = {
                                    from: "no-reply@mapApp.com",
                                    recipients: [user.email],
                                    subject: "[ACTION REQUIRED] Verify your email to continue.",
                                    message: `<h1>Hey ${user.firstname}, </h1><h1>Please verify your email to continue</h1> <br> <a href="${process.env.HOST}/api/user/verify/${user.token}"> <button>Verify</button>`,
                                };
                                    sendEmail(mailObj);
apiResponse.successResponseWithData(res, "User registered successfully.", user);                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
}


// Login
exports.login = (req, res) => {
    
        // Check for registration errors
        const { errors, isValid } = validateLoginInput(req.body);
    
        // Check validation
        if (!isValid) {
            return apiResponse.errorResponse(res, "Validation Error.", errors);
        }
    
        const email = req.body.email;
        const password = req.body.password;
    
        // Find user by email
        User.findOne({ email }).then(user => {
            // Check for user
            if (!user) {
                errors.email = 'User not found';
                return apiResponse.errorResponse(res, "No user found");
            }
    else if(!user.isVerified){
        const mailObj = {
            from: "no-reply@mapapp.com",
            recipients: [user.email],
            subject: "[ACTION REQUIRED] Verify your email to continue.",
            message: `<h1>Hey ${user.firstname}, </h1><h1>Please verify your email to continue</h1> <br> <a href="${process.env.HOST}/api/user/verify/${user.token}"> <button>Verify</button>`,
          };
            sendEmail(mailObj);
            errors.email = 'Please verify your email';
            return apiResponse.errorResponse(res, "Please verify your email");
        }

            // Check password
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    // User matched
                    // Create JWT Payload
                    const payload = {
                        id: user.id,
                        name: user.name
                    };
    
                    // Sign token
                    
                    return apiResponse.successResponse(res, "Login Successful");
                } else {
                    errors.password = 'Password incorrect';
                    return apiResponse.errorResponse(res, "invalid password");
                }
            });
        });
    }
    
// verify user with email token
exports.verify = (req, res) => {
    const token = req.params.token;
    User.findOne({ token })
        .then(user => {
            if (!user) {
               return res.render('error')            }
            user.isVerified = true;
            user.save()
                .then(user => res.render('succes'))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}
// reset password
exports.resetPassword = (req, res) => {
    const email = req.body.email;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = 'User not found';
                return apiResponse.errorResponse(res, "No user found");
            }
            const mailObj = {
                from: "no-reply@mapapp.com",
                recipients: [user.email],
                subject: "Reset Password",
                message: `<h1>Hey ${user.name}, </h1><h1>Please click on the link below to reset your password</h1> <br> <a href="${process.env.HOST}/api/user/reset/${user.token}"> <button>Reset Password</button>`,
                };
            sendEmail(mailObj);
            apiResponse.successResponse(res, "Reset password link sent to your email");
        })
        .catch(err => console.log(err));
}
// reset password page
exports.resetPasswordPage = (req, res) => {
    const token = req.params.token;
    User.findOne({ token })
        .then(user => {
            if (!user) {
                return res.render('error')            }
            res.render('reset',{link:`${process.env.HOST}/api/user/setnewpass/${user.token}`});
        })
        .catch(err => console.log(err));
}
// reset password
// set new password
exports.setNewPassword = (req, res) => {
    const password = req.body.password;
    const token = req.params.token;
    User.findOne({ token })
        .then(user => {
            if (!user) {
                errors.email = 'User not found';
                return apiResponse.errorResponse(res, "No user found");
            }
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.save()
                        .then(user => res.render('succes'))
                        .catch(err => console.log(err));
                });
            });
        }

        )
}

