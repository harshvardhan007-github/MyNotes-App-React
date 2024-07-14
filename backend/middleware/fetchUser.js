const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ThisIsAJWTSecret'


const fetchuser = (req, res, next) => {
    // Get the user from jwt token and add it to req object
    const token = req.header('auth-token'); // auth-token will be the name of the header in which we are sending a header, which is the jwt token
    if (!token) {
        res.status(401).send({ error: "Please authenticate using valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET); // jwt.verify() returns the user structure with user id contained in the token and some additional info(iat), the userID using which the token was formed 
        console.log(data);

        req.user = data.user; // a new property user is created in req.
        next(); // This will call the function next to fetchdata wherever it is used, like fetchuser in auth.js, i.e. async(req, res)

    } catch (error) {
        res.status(500).send({ error: "Please authenticate using valid token" });
    }

}

module.exports = fetchuser;
