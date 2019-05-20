const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); //<<<<<<<<<<<<<<<<<<<

const Users = require('../models/users');
const secrets = require('../config/secrets.js');

const asyncHandler = require('../util/asyncHandler')

router.post('/register', asyncHandler((req, res) => register(req, res)))
router.post('/login', asyncHandler((req, res) => login(req, res)));



const login = async(req, res) => {
  const user = req.body;
  const { password, username } = user

  if (!user || !password || !username) {
    res.status(400).json({error: 'Username and Password Must Be Entered'});
    return
  }
  
  Users.findBy({ username })
    .first()
    .then(user => {
      console.log(user)
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); // <<<<<<<<<<<<<<<<<<<<<<<<
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
        });
      } else {
        res.status(403).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
}

const register = async(req, res) => {
  const user = req.body;
  const { password, username, lastName, firstName } = user

  if (!user || !password || !username || !lastName || !firstName) {
    res.status(400).json({error: 'Every Field Must Be Entered'});
    return
  }

  const result = await Users.findBy({ username })
  if (result.length > 0) {
    // throw new Error('error')
    res.status(409).json({error: 'Username Already Taken'});
    return
  }

  
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash
  const newUser = await Users.add(user)
  const token = generateToken(newUser); // <<<<<<<<<<<<<<<<<<<<<<<<
  res.status(200).json({
    message: `Welcome ${newUser.username}!`,
    token,
  });

}



function generateToken(user) {
  const payload = {
    subject: user.id, // what the token is describing
    username: user.username,
    roles: ['student'], // user.roles
  };
  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
