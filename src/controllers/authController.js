const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { registerValidation, loginValidation } = require('../validation/authValidation');

exports.register = async (req, res) => {
  try {
    const reqParam = req.body;   
    registerValidation(reqParam , res , async (valid) => {
      if(valid) {
        const { email, password } = reqParam;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        res.json({ status : 200 , message: 'User registered successfully', user });
      }
    })
  } catch (error) {
    errorResponseWithoutData(res , error.message)
  }
};

exports.login = async (req, res) => {
  try {
    const reqParam = req.body;   
    loginValidation(reqParam , res , async (valid) => {
      const { email, password } = reqParam;
      const user = await User.findOne({ where: { email } });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({status : 400 , message: 'Invalid email or password' });
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({status : 200 , message: 'Login successfully', token : token });
    }) 
  } catch (error) {
    errorResponseWithoutData(res , error.message)
  }
};

exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ status : 400 , message: 'No token provided' });
    let mainToken = token.slice(7, token.length);
    jwt.verify(mainToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({status : 400 , message: 'Failed to authenticate token' });
      req.userId = decoded.userId;
      next();
    }); 
  } catch (error) {
    errorResponseWithoutData(res , error.message)
  }
};
