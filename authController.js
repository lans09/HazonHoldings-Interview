const User = require('./UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const signUp = async(req,res)=>{
    const {email, password} = req.body

      if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }
      const emailParts = email.split('@');
      const username = emailParts[0];
        // Check if user exists in database
        const isUser = await User.findOne({ email });

    try {
        if (isUser) {
          return res.status(409).json({
            success: false,
            message: 'User already exists',
          });
        }
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
  
        // Create a new user
        const user = new User({ username, email, password: hashedPassword });
  
        // Save the user to the database
        await user.save();
  
      return res.status(201).json({ 
          message: 'User created successfully', 
          content: user 
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
    }
    const login = async (req, res) => {
        try {
          const { email, password } = req.body;
      
          // validate input
          if (!email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
          }
      
          // check if user exists in the database
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          // compare passwords
          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
      
          // create a JWT token
          const token = jwt.sign({ userId: user._id ,email : user.email }, process.env.JWT_SECRET);
      
          return res.status(200).json({ 
            message: 'Login successful', 
            token : token });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ 
            message: 'Error logging in', 
            content : error });
        }
      };
      const signout = async(req,res)=>{
        return res.status(200).json({ message: 'Sign-out successful' });
}
      
module.exports = {
    signUp,
    login,
    signout
}
    
