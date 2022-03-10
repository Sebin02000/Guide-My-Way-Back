// User login and signup with email and password


const User = require('../models/user');

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

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                // bcrypt.genSalt(10, (err, salt) => {
                //     bcrypt.hash(newUser.password, salt, (err, hash) => {
                //         if (err) throw err;
                //         newUser.password = hash;
                //         newUser.save()
                //             .then(user => res.json(user))
                //             .catch(err => console.log(err));
                //     });
                // });
            }
        });
}


// Login
exports.login = (req, res) => {
    
        // Check for registration errors
        const { errors, isValid } = validateLoginInput(req.body);
    
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
    
        const email = req.body.email;
        const password = req.body.password;
    
        // Find user by email
        User.findOne({ email }).then(user => {
            // Check for user
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
    
            // Check password
            // bcrypt.compare(password, user.password).then(isMatch => {
            //     if (isMatch) {
            //         // User matched
            //         // Create JWT Payload
            //         const payload = {
            //             id: user.id,
            //             name: user.name
            //         };
    
            //         // Sign token
            //         jwt.sign(
            //             payload,
            //             config.secret,
            //             {
            //                 expiresIn: 3600
            //             },
            //             (err, token) => {
            //                 res.json({
            //                     success: true,
            //                     token: 'Bearer ' + token
            //                 });
            //             }
            //         );
            //     } else {
            //         errors.password = 'Password incorrect';
            //         return res.status(400).json(errors);
            //     }
            // });
        });
    }
    
