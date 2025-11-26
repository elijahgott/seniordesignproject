const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../utils/config')
const loginRouter = require('express').Router()
// const User = require('../models/user')

// handles signing user in
loginRouter.post('/', (req, res) => {
    const {username, password} = req.body;
    const sql = "select * from user where username = ? and password = ?";

    db.query(sql, [username, password], (err, results) => {
        if(err){
            console.error('Error executing query: ', err);
            res.status(500).json({message: 'Error signing in'});
        }
        else {
            if(results.length > 0){
                const token = jwt.sign({ username }, 'testing_key', { expiresIn: '1h' });
                res.status(200).json({message: 'Sign in successful', token, user: results[0]});
            }
            else {
                res.status(401).json({message: 'Invalid username or password'})
            }
        }
    }); 
});

// loginRouter.post('/', async (req, res) => {
//   const { username, password } = req.body
  
//   const user = await User.findOne({ username: username })
//   const passwordCorrect =
//     user === null ? false : await bcrypt.compare(password, user.passwordHash)

//   if (!(user && passwordCorrect)) {
//     return res.status(401).json({
//       error: 'invalid username or password'
//     })
//   }

//   const userForToken = {
//     username: user.username,
//     id: user._id
//   }

//   const token = jwt.sign(userForToken, config.SECRET)

//   res.status(200).send({ token, username: user.username, id: user._id.toString() })
// })

module.exports = loginRouter