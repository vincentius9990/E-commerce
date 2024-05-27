// Importing the jsonwebtoken library, which is used for creating and verifying JSON web tokens (JWTs)
const jwt = require('jsonwebtoken');
const User=require('../models/userschema');
// Defining an authentication middleware function
const authMiddleware = async (req, res, next) => {
    const authHeader=req.header('Authorization')// Extracting the token from the Authorization header in the incoming request
  
    if (!authHeader) {
        // If no Authorization header is present, return a 401 Unauthorized status with a message
        return res.status(401).json({ message: 'no auth header added' });
      }
    const token = authHeader.split(' ')[1];//spliting the string and accessing array item at index 1
console.log(token);
  // Checking if a token exists
  if (!token) {
    // If no token is present, return a 401 Unauthorized status with a message
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    const {_id} = jwt.verify(token, process.env.SECRET_KEY);//extracts payload


    // If the token is successfully verified, attach the decoded user information to the request object
    req.user = await User.findOne({_id}).select('_id');

    // Call the next middleware function in the chain
    next();
  } catch (err) {
    console.log(err);
    // If an error occurs during token verification (e.g., token expired or invalid), return a 401 Unauthorized status with a message
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Exporting the authentication middleware function to be used in other parts of the application
module.exports = authMiddleware;

