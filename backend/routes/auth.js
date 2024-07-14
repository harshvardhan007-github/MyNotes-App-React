const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');

const JWT_SECRET = 'ThisIsAJWTSecret';


// Route 1: Create user using: POST "/api/auth/". Doesn't require Auth
router.post('/createuser', [
    // checking minimal requirements
    body('name', 'Enter a valid name').isLength({ min: 3 }),        //
    body('email', 'Enter a valid email').isEmail(),                // --> Authentication Block
    body('password').isLength({ min: 5 })                          //
], async (req, res) => {
    // console.log(req.body);
 
    let success = false;
    const result = validationResult(req);
    // If errors found, show errors to result output.
    if (!result.isEmpty()) {
        return res.send({ success, errors: result.array() });
    }

    // res.send() can only be used once. It is used for sending response

    // Creating user:
    try {

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt);

        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        // Read the theory of JWT in notes of L44/L49
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.send({success, authtoken});

    } catch (err) {
        if (err.code === 11000) { // Check for duplicate key error code(for unique email)
            return res.status(400).json({ success, error: "User with this Email already exists..." });
        } else {
            // Handle other errors (optional)
            console.error(err);
            return res.status(500).json({ success, error: "Internal server error" });
        }
    }

    // .then(user => res.json(user)).catch(err => {
    //     console.log(err);
    //     res.json({error: 'This email is already used..', message: err.message});
    // })

    // const user = User(req.body); // creating user
    // user.save();

    // const user = User(req.body);
    // user.save();

    // res.send("hello");
})


// Route 2: Authenticate a User using: POST "/api/auth/login".
router.post('/login', [
    // checking minimal requirements
    body('email', 'Enter a valid email').isEmail(),                // --> Authentication: checking valid email
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {

    let success = false;
    const result = validationResult(req);
    // If errors found, show errors to result output.
    if (!result.isEmpty()) {
        return res.send({ success, errors: result.array() });
    }

    const {email, password} = req.body;
    try {
        // checking whether user with email exists
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success, error: "Please try to login with valid credentials - 1"});
        }

        // comparing passwords
        const passwordCompare = await bcrypt.compare(password, user.password);
        // If not same
        if(!passwordCompare){
            return res.status(400).json({success, error: "Please try to login with valid credentials - 2"});
        }

        // If same, retuen auth token
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.send({success, authtoken});
        
    } catch (error) {
        return res.status(500).json({success, error: "Internal server error"});
    }

})
 

// Route 3: Get logged in user details: POST "/api/auth/getuser". Login required

// In this project/case, whenever you want to get the userdata using the auth token, use the fetchuser function. It will append the req with user data stored as "user"
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        var userId = req.user.id;
        const user = await User.findById(userId).select("-password") // exclusing password
        res.send(user);
    } catch (error) {
        return res.status(500).json({error: "Internal server error"});
    }

})

module.exports = router



// Notes:
// By default, Mongoose uses the pluralized lowercase version of the model name (in this case, "users") as the collection name. "users" from "user" variable in this case